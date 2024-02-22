export async function convertBlobAttributes(
  data: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const result: Record<string, unknown> = {}
  for (const key in data) {
    result[key] = await convertAttribute(data[key])
  }
  return result
}

async function convertAttribute(value: unknown) {
  if (value instanceof Blob) return blobToBinary(value)
  if (Array.isArray(value) && value.every((v) => v instanceof Blob)) {
    return Promise.all(value.map((v) => blobToBinary(v)))
  }

  return value
}

async function blobToBinary(blob: Blob | File): Promise<{
  dataBase64: string
  filename: string
}> {
  return {
    dataBase64: await blobToBase64(blob),
    filename: blob instanceof File ? blob.name : 'unknown-name',
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
