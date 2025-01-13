export async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onabort = (e) => reject(e)
    reader.onerror = (e) => reject(e)
    reader.onload = () => {
      const dataUrl = reader.result
      if (typeof dataUrl !== 'string') {
        reject(
          new Error(
            `FileReader result is not a string (${dataUrl?.constructor.name || JSON.stringify(dataUrl)})`,
          ),
        )
        return
      }

      resolve(dataUrl)
    }
    reader.readAsDataURL(file)
  })
}
