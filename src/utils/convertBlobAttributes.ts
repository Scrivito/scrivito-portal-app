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
  const binary = {
    dataBase64: await blobToBase64(blob),
    filename: blob instanceof File ? blob.name : 'unknown-name',
  }

  return import.meta.env.ENABLE_PISA
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
        reject(new Error(`FileReader result is not a string: ${dataUrl}`))
        return
      }

      const dataPrefix = `data:${blob.type};base64,`
      if (!dataUrl.startsWith(dataPrefix)) {
        reject(
          new Error(
            `FileReader result does not start with expected prefix: ${dataUrl}`,
          ),
        )
        return
      }

      resolve(dataUrl.substring(dataPrefix.length))
    }

    reader.readAsDataURL(blob)
  })
}
