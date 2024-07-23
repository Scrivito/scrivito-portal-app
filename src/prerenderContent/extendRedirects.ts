import { readFile, writeFile } from 'fs/promises'

// Netlify normalizes URLs automatically.
// A URL that contains uppercase characters is automatically converted to lowercase.
// However, Scrivito is case-sensitive for routing and will no longer recognize the lowercased route.
// By explicitly adding the uppercase URL to "_redirects", Netlify will no longer normalize the URL.
export async function extendRedirects(
  targetDir: string,
  prerenderedFiles: string[],
  sourceDir: string,
): Promise<void> {
  const explicitRedirects = prerenderedFiles
    .filter((f) => f.endsWith('.html') && f.toLowerCase() !== f)
    .map((file) => `${file.substring(0, file.length - 5)} ${file} 200`)
  const sourceRedirects = await readFile(`${sourceDir}/_redirects`, 'utf8')
  const placeholder = '# PRERENDERED-UPPERCASE-ROUTES-PLACEHOLDER'
  if (sourceRedirects.indexOf(placeholder) === -1) {
    throw new Error(
      `The following placeholder is missing in _redirects:
      ${placeholder}`,
    )
  }
  const extendedRedirects = sourceRedirects.replace(
    placeholder,
    explicitRedirects.join('\n'),
  )
  const target = `${targetDir}/_redirects`
  await writeFile(target, extendedRedirects, 'utf8')
  console.log(
    `  📦 [extendRedirects] Extended ${target} with ${explicitRedirects.length} entries.`,
  )
}
