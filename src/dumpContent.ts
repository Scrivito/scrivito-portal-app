#!npx vite-node
import fs from 'fs'
import { promisify } from 'util'

type ObjData = { _id: string }
type SearchData = { continuation?: string; objs: ObjData[] }
type BlobsData = { private_access: { get: { url: string } } }

const DIRECTORY = 'contentDump'

const API_KEY = process.env.SCRIVITO_API_KEY
const INSTANCE_ID = process.env.SCRIVITO_TENANT || ''

if (INSTANCE_ID && API_KEY) {
  clearDump()
  await dumpContent()
  console.log('\n✅ Dump complete.')
} else {
  console.error(
    'Please provide SCRIVITO_TENANT and SCRIVITO_API_KEY of the instance to dump.',
  )
  process.exitCode = -1
}

function clearDump() {
  fs.rmSync(DIRECTORY, { force: true, recursive: true })
  fs.mkdirSync(`${DIRECTORY}/json`, { recursive: true })
  fs.mkdirSync(`${DIRECTORY}/binary`, { recursive: true })
}

async function dumpContent() {
  let continuation

  do {
    const data: SearchData = await fetchJson<SearchData>(
      `workspaces/published/objs/search`,
      JSON.stringify({
        continuation,
        include_objs: true,
        options: { site_aware: true },
        size: 10,
      }),
    )

    for (const objData of data.objs) await dumpObjAndBinaries(objData)

    continuation = data.continuation
  } while (continuation)
}

async function dumpObjAndBinaries(objData: ObjData) {
  await forEachBinaryId(objData, dumpBinary)
  dumpObj(objData)
}

async function forEachBinaryId(
  data: unknown,
  handler: (binaryId: string) => Promise<void>,
) {
  if (!data || typeof data !== 'object') return
  if (isBinaryData(data)) await handler(data[1].id)
  else for (const d of Object.values(data)) await forEachBinaryId(d, handler)
}

function isBinaryData(data: unknown): data is ['binary', { id: string }] {
  return (
    Array.isArray(data) &&
    data.length === 2 &&
    data[0] === 'binary' &&
    typeof data[1] === 'object' &&
    data[1].id
  )
}

async function dumpBinary(id: string) {
  const binary = await fetchJson<BlobsData>(`blobs/${encodeURIComponent(id)}`)
  const url = binary.private_access.get.url
  const response = await fetch(url)
  if (response.status !== 200) throw new Error(`Failed to fetch ${url}`)
  const blob = await response.blob()
  fs.writeFileSync(
    `${DIRECTORY}/binary/${encodeURIComponent(id)}`,
    Buffer.from(await blob.arrayBuffer()),
  )
}

function dumpObj(objData: ObjData) {
  fs.writeFileSync(
    `${DIRECTORY}/json/${objData._id}.json`,
    JSON.stringify(objData, null, 2),
  )
}

async function fetchJson<T>(apiPath: string, body?: string): Promise<T> {
  process.stdout.write('.')

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`api_token:${API_KEY}`).toString(
      'base64',
    )}`,
  }
  const response = await fetch(
    `https://api.scrivito.com/tenants/${INSTANCE_ID}/${apiPath}`,
    { body, headers, method: body ? 'put' : 'get' },
  )
  if (response.status === 200) return response.json()

  console.log(`\nHTTP status ${response.status}, retrying...\n`)
  const sleep = promisify(setTimeout)
  await sleep(2000)
  return fetchJson(apiPath, body)
}
