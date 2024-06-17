#!npx vite-node
import fs from 'fs'
import { configure, createRestApiClient } from 'scrivito'
import { loadEnv } from 'vite'

type ObjData = {
  _id: string
  _path?: string
  _site_id?: string
  _widget_pool?: Record<string, WidgetData>
  pisa_url?: unknown
}
type WidgetData = Record<string, unknown>
type SearchData = { continuation?: string; objs: ObjData[] }
type BlobsData = { private_access: { get: { url: string } } }
type BlobMetadata = {
  meta_data: { content_type: ['string', string]; filename: ['string', string] }
}

const DUMP_PATH = 'contentDump'

const env = loadEnv('development', process.cwd(), '')

const API_CLIENT_ID = env.CONTENT_MASTER_API_CLIENT_ID || ''
const API_CLIENT_SECRET = env.CONTENT_MASTER_API_CLIENT_SECRET || ''
const INSTANCE_ID = env.CONTENT_MASTER_SCRIVITO_TENANT || ''

const scrivitoClient = createRestApiClient(
  `https://api.scrivito.com/tenants/${INSTANCE_ID}`,
  { headers: { 'Scrivito-Access-As': 'editor' } },
)

if (API_CLIENT_ID && API_CLIENT_SECRET && INSTANCE_ID) {
  configure({
    tenant: INSTANCE_ID,
    apiKey: {
      clientId: API_CLIENT_ID,
      clientSecret: API_CLIENT_SECRET,
    },
    priority: 'background',
  })

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
    const data = (await scrivitoClient.put('workspaces/published/objs/search', {
      data: {
        continuation,
        include_objs: true,
        options: { site_aware: true },
        size: 10,
      },
    })) as SearchData
    process.stdout.write('.')

    for (const objData of data.objs) {
      const processedObjData = ignorePerInstanceData(objData)
      await dumpObjAndBinaries(processedObjData)
      objIds.push(processedObjData._id)
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

function ignorePerInstanceData(objData: ObjData): ObjData {
  if (objData._site_id === 'default' && objData._path === '/') {
    delete objData.pisa_url
  }

  return objData
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
  const binary = (await scrivitoClient.get(
    `blobs/${encodeURIComponent(binaryId)}`,
  )) as BlobsData
  process.stdout.write('.')
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
  } = (await scrivitoClient.get(
    `blobs/${encodeURIComponent(binaryId)}/meta_data`,
  )) as BlobMetadata
  process.stdout.write('.')
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
