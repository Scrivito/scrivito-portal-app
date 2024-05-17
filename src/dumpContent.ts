#!npx vite-node
import fs from 'fs'
import { promisify } from 'util'
import { loadEnv } from 'vite'

type ObjData = { _id: string; _widget_pool?: Record<string, WidgetData> }
type WidgetData = Record<string, unknown>
type SearchData = { continuation?: string; objs: ObjData[] }
type BlobsData = { private_access: { get: { url: string } } }
type BlobMetadata = {
  meta_data: { content_type: ['string', string]; filename: ['string', string] }
}

const DUMP_PATH = 'contentDump'

const UNWANTED_OBJ_IDS = ['05de9425035de4f7', '0787fc76eea28ac2']

const env = loadEnv('development', process.cwd(), '')

const API_CLIENT_ID = env.CONTENT_MASTER_API_CLIENT_ID || ''
const API_CLIENT_SECRET = env.CONTENT_MASTER_API_CLIENT_SECRET || ''
const INSTANCE_ID = env.CONTENT_MASTER_SCRIVITO_TENANT || ''

let apiToken: string | undefined = undefined

if (API_CLIENT_ID && API_CLIENT_SECRET && INSTANCE_ID) {
  clearDump()
  await dumpContent()
  console.log(`\n✅ Dump complete (${fileStats()}).`)
} else {
  console.error(
    'Please provide CONTENT_MASTER_SCRIVITO_TENANT and credentials:',
    'CONTENT_MASTER_API_CLIENT_ID, CONTENT_MASTER_API_CLIENT_SECRET.',
  )
  process.exitCode = -1
}

function clearDump() {
  fs.rmSync(DUMP_PATH, { force: true, recursive: true })
  fs.mkdirSync(DUMP_PATH, { recursive: true })
}

function fileStats() {
  const files = fs.readdirSync(DUMP_PATH)
  return `${files.length} files`
}

async function dumpContent() {
  let continuation: string | undefined
  const objIds = []

  do {
    const data: SearchData = await fetchJson<SearchData>(
      `workspaces/published/objs/search`,
      {
        data: {
          continuation,
          include_objs: true,
          options: { site_aware: true },
          size: 10,
        },
        method: 'put',
      },
    )

    for (const objData of data.objs) {
      if (UNWANTED_OBJ_IDS.includes(objData._id)) continue

      await dumpObjAndBinaries(objData)
      objIds.push(objData._id)
    }

    continuation = data.continuation
  } while (continuation)

  dumpManifest(objIds)
}

function dumpManifest(objIds: string[]) {
  fs.writeFileSync(
    `${DUMP_PATH}/index.json`,
    JSON.stringify({ objIds }, null, 2),
  )
}

async function dumpObjAndBinaries(objData: ObjData) {
  await dumpBinaries(objData)
  dumpObj(objData)
}

async function dumpBinaries(data: ObjData | WidgetData) {
  for (const value of Object.values(data)) {
    if (isBinaryAttribute(value)) {
      const { id } = value[1]
      await Promise.all([dumpBinary(id), dumpMetadata(id)])
    }
  }

  const widgetPool = data._widget_pool || {}
  for (const widget of Object.values(widgetPool)) await dumpBinaries(widget)
}

function isBinaryAttribute(data: unknown): data is ['binary', { id: string }] {
  if (!Array.isArray(data)) return false
  const [attributeType, attributeValue] = data
  return (
    attributeType === 'binary' &&
    !!attributeValue &&
    typeof attributeValue === 'object' &&
    typeof attributeValue.id === 'string'
  )
}

async function dumpBinary(binaryId: string) {
  const binary = await fetchJson<BlobsData>(
    `blobs/${encodeURIComponent(binaryId)}`,
  )
  const url = binary.private_access.get.url
  const response = await fetch(url)
  if (response.status !== 200) throw new Error(`Failed to fetch ${url}`)
  const blob = await response.blob()
  fs.writeFileSync(
    `${DUMP_PATH}/blob-${urlSafeBase64(binaryId)}`,
    Buffer.from(await blob.arrayBuffer()),
  )
}

async function dumpMetadata(binaryId: string) {
  const {
    meta_data: {
      content_type: [, contentType],
      filename: [, filename],
    },
  } = await fetchJson<BlobMetadata>(
    `blobs/${encodeURIComponent(binaryId)}/meta_data`,
  )
  fs.writeFileSync(
    `${DUMP_PATH}/blob-metadata-${urlSafeBase64(binaryId)}.json`,
    JSON.stringify({ contentType, filename }, null, 2),
  )
}

function urlSafeBase64(id: string): string {
  return btoa(id).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+/, '')
}

function dumpObj(objData: ObjData) {
  fs.writeFileSync(
    `${DUMP_PATH}/obj-${objData._id}.json`,
    JSON.stringify(objData, null, 2),
  )
}

async function fetchJson<T>(
  apiPath: string,
  options: { data?: Record<string, unknown>; method?: string } = {},
): Promise<T> {
  process.stdout.write('.')

  if (!apiToken) apiToken = await fetchIamToken()

  const response = await fetch(
    `https://api.scrivito.com/tenants/${INSTANCE_ID}/${apiPath}`,
    {
      body: options.data ? JSON.stringify(options.data) : undefined,
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Scrivito-Access-As': 'editor',
      },
      method: options.method,
    },
  )
  if (response.status === 200) return response.json()

  console.log(`\nHTTP status ${response.status}, retrying...\n`)
  apiToken = undefined
  const sleep = promisify(setTimeout)
  await sleep(2000)
  return fetchJson(apiPath, options)
}

async function fetchIamToken(): Promise<string> {
  const response = await fetch('https://api.justrelate.com/iam/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${encodeURIComponent(API_CLIENT_ID)}:${encodeURIComponent(
          API_CLIENT_SECRET,
        )}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (response.status !== 200) throw new Error('Failed to get API access.')

  return (await response.json()).access_token
}
