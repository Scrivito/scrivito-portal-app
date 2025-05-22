import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

import { reportError } from './reportError'

export async function storeResult(
  targetDir: string,
  { filename, content }: { filename: string; content: string },
): Promise<string | void> {
  const filePath = path.join(targetDir, filename)
  if (!path.normalize(filePath).startsWith(`${targetDir}`)) {
    await reportError(`filename "${filename}" is invalid! Skipping file...`)
    return
  }
  console.log(
    `  📥 [storeResult] Storing "${filename}" (file size: ${filesize(
      content.length,
    )})...`,
  )
  try {
    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, content, { flag: 'wx' })
    return filePath.substring(targetDir.length)
  } catch (e) {
    if (e instanceof Object && 'code' in e && e.code === 'EEXIST') {
      reportError(
        `Filename "${filename}" already exists in ${targetDir}! Skipping file...`,
      )
    } else {
      throw e
    }
  }
}

function filesize(contentLength: number) {
  return new Intl.NumberFormat('en', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: 'unit',
    unit: 'kilobyte',
  }).format(contentLength / 1000)
}
