import { pisaSalesApiUrl } from '../Data/pisaClient'
import { pseudoRandom32CharHex } from './pseudoRandom32CharHex'
import { truncate } from 'lodash-es'

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
  const binary = {
    dataBase64: await blobToBase64(blob),
    filename: blob instanceof File ? blob.name : 'unknown-name',
  }

  const connectedToPisa = (await pisaSalesApiUrl()) !== null

  return connectedToPisa
    ? binary
    : {
        ...binary,
        contentLength: blob.size,
        contentType: blob.type,
        _id: pseudoRandom32CharHex(),
      }
}

async function blobToBase64(blob: Blob): Promise<string> {
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

      const parts = dataUrl.split(';base64,')
      const [, secondPart, ...rest] = parts
      if (!secondPart || rest.length > 0) {
        reject(
          new Error(
            `FileReader result does not contain the delimiter “;base64,”: ${truncate(dataUrl, { length: 50 })}`,
          ),
        )
        return
      }

      resolve(secondPart)
    }

    reader.readAsDataURL(blob)
  })
}
