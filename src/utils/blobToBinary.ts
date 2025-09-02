import { pisaSalesApiUrl } from '../Data/pisaClient'
import { pseudoRandom32CharHex } from './pseudoRandom32CharHex'

export interface DataBinaryUpload {
  dataBase64: string
  filename: string

  // only needed for localStorage
  contentLength?: number
  contentType?: string
  _id?: string
}

export async function blobToBinary(
  blob: Blob | File,
): Promise<DataBinaryUpload> {
  const { dataBase64, contentType } = await blobToBase64(blob)
  const filename = blob instanceof File ? blob.name : 'unknown-name'
  const binary = { dataBase64, filename }

  const connectedToPisa = (await pisaSalesApiUrl()) !== null

  return connectedToPisa
    ? binary
    : {
        ...binary,
        contentLength: blob.size,
        contentType,
        _id: pseudoRandom32CharHex(),
      }
}

async function blobToBase64(
  blob: Blob,
): Promise<{ dataBase64: string; contentType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onabort = (e) => reject(e)
    reader.onerror = (e) => reject(e)
    reader.onload = () => {
      const dataUrl = reader.result
      if (typeof dataUrl !== 'string') {
        reject(
          new Error(
            `FileReader result is not a string: ${dataUrl?.constructor.name || JSON.stringify(dataUrl)}`,
          ),
        )
        return
      }

      const genericPrefix = 'data:application/octet-stream;base64,'
      if (dataUrl.startsWith(genericPrefix)) {
        resolve({
          dataBase64: dataUrl.substring(genericPrefix.length),
          contentType: 'application/octet-stream',
        })
        return
      }

      if (!blob.type) {
        reject(
          new Error(
            `FileReader result does not start with expected prefix 'data:application/octet-stream;base64,' and blob.type is empty: ${dataUrl.substring(0, 100)}${dataUrl.length > 100 ? '...' : ''}`,
          ),
        )
        return
      }

      const dataPrefix = `data:${blob.type};base64,`
      if (!dataUrl.startsWith(dataPrefix)) {
        reject(
          new Error(
            `FileReader result does not start with expected prefix 'data:application/octet-stream;base64,' or '${dataPrefix}': ${dataUrl.substring(0, 100)}${dataUrl.length > 100 ? '...' : ''}`,
          ),
        )
        return
      }

      resolve({
        dataBase64: dataUrl.substring(dataPrefix.length),
        contentType: blob.type,
      })
    }

    reader.readAsDataURL(blob)
  })
}
