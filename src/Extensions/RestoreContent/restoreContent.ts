import { Obj, currentWorkspaceId, getInstanceId, load } from 'scrivito'
const json = import.meta.glob('../../../contentDump/objs/*', { as: 'raw' })
const binaries = import.meta.glob('../../../contentDump/binaries/*', {
  as: 'url',
})

type ObjData = {
  _id: string
  _obj_class: string
  _permalink?: string
  _widget_pool?: Record<string, WidgetData>
}
type WidgetData = Record<string, unknown>
type ActivateUploadData = { task: UploadTaskData }
type UploadPermissionData = {
  blob: string
  fields: Record<string, string>
  url: string
}
type UploadTaskData = {
  id: string
  error: string
  result: { id: string }
  status: string
}
type Logger = (opts: { count?: number; step?: string[]; text?: string }) => void

const urlForBinaryId = Object.fromEntries(
  Object.entries(binaries).map(([path, url]) => [
    decodeURIComponent(path.split('/').at(-1)!),
    url,
  ]),
)

let credentials: { apiClientId: string; apiClientSecret: string }
let log: Logger

export async function restoreContent({
  apiClientId,
  apiClientSecret,
  log: logger,
}: {
  apiClientId: string
  apiClientSecret: string
  log: Logger
}) {
  credentials = { apiClientId, apiClientSecret }
  log = logger
  const binariesCount = Object.keys(urlForBinaryId).length
  const objsCount = Object.keys(json).length

  try {
    await clearContent()

    log({ text: '🐣 Restoring content', count: objsCount + binariesCount })

    for (const objJson of Object.values(json)) {
      const objData = JSON.parse(await objJson()) as ObjData
      const objId = objData._id

      await restoreBinaries(objData, objId)

      log({ step: ['adding', objData._obj_class, objData._permalink || objId] })

      await fetchJson(`workspaces/${currentWorkspaceId()}/objs/${objId}`, {
        data: { obj: objData },
        method: 'put',
      })
    }

    log({
      text: `✅ Restore complete (${objsCount} objs and ${binariesCount} binaries).`,
      count: 0,
    })
  } catch (e) {
    log({ text: `❌ Error: ${e}` })
  }
}

async function clearContent() {
  log({ text: '🔍 Looking for existing content' })
  const objs = await load(() => Obj.onAllSites().all().toArray())

  log({ text: '🗑️ Deleting existing content', count: objs.length })
  for (const obj of objs) {
    log({ step: ['deleting', obj.objClass(), obj.permalink() || obj.id()] })
    obj.delete()
    await obj.finishSaving()
  }
}

/**
 * @param data Will be modified in place with new binary IDs
 */
async function restoreBinaries(data: ObjData | WidgetData, objId: string) {
  for (const v of Object.values(data)) {
    if (isBinaryAttribute(v)) v[1].id = await restoreBinary(objId, v[1].id)
  }

  const widgetPool = data._widget_pool || {}
  for (const w of Object.values(widgetPool)) await restoreBinaries(w, objId)
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

async function restoreBinary(objId: string, binaryId: string) {
  const filename = binaryId.split('/').at(-1)
  log({ step: ['uploading', filename || ''] })

  const binaryUrl = await urlForBinaryId[binaryId]()
  const binaryData = await fetch(binaryUrl)
  const binaryBlob = await binaryData.blob()

  const { url, fields, blob } = await fetchJson<UploadPermissionData>(
    'blobs/upload_permission',
  )

  const body = new FormData()
  Object.entries(fields).forEach(([k, v]) => body.append(k, v))
  body.append('file', binaryBlob, filename)
  const { status } = await fetch(url, { method: 'post', body })
  if (status > 204) throw new Error('upload failed')

  let { task } = await fetchJson<ActivateUploadData>('blobs/activate_upload', {
    data: { filename, obj_id: objId, upload: blob },
    method: 'put',
  })
  while (task.status === 'open') {
    await new Promise((resolve) => setTimeout(resolve, 300))
    try {
      task = await fetchJson<UploadTaskData>(`tasks/${task.id}`)
    } catch {
      /* retry */
    }
  }
  if (task.status !== 'success') throw new Error(task.error)
  return task.result.id
}

let apiToken: string | undefined = undefined

async function fetchJson<T>(
  apiPath: string,
  options: { data?: Record<string, unknown>; method?: string } = {},
): Promise<T> {
  if (!apiToken) apiToken = await fetchIamToken()

  const response = await fetch(
    `/jr-api/scrivito/tenants/${getInstanceId()}/${apiPath}`,
    {
      body: options.data ? JSON.stringify(options.data) : undefined,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Scrivito-Access-As': 'editor',
      },
      method: options.method,
      mode: 'cors',
    },
  )
  if (response.status <= 204) return response.json()

  throw new Error(`Failed to fetch ${apiPath}.`)
}

async function fetchIamToken(): Promise<string> {
  if (!credentials) throw new Error('Missing credentials.')

  const response = await fetch('/jr-api/iam/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(
        `${encodeURIComponent(credentials.apiClientId)}:${encodeURIComponent(
          credentials.apiClientSecret,
        )}`,
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (response.status !== 200) throw new Error('Failed to get API access.')

  return (await response.json()).access_token
}
