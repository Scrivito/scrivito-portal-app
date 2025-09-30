export async function generateHtml(
  baseHtmlTemplate: string,
  data: {
    bodyContent: string
    htmlAttributes: string
    preloadDumpScript: string
    headContent: string
  },
): Promise<string> {
  return keys.reduce((html, key) => {
    const re = replacements[key]
    if (html.match(re)) return html.replace(re, () => data[key])
    throw new Error(`Missing placeholder for ${key} in index.html.`)
  }, baseHtmlTemplate)
}

const replacements: Record<(typeof keys)[number], RegExp> = {
  bodyContent: /\n *<!-- bodyContent start -->[^!]*<!-- bodyContent end -->\s*/,
  htmlAttributes: /data-htmlAttributes/,
  preloadDumpScript: /<!-- preloadDumpScript -->/,
  headContent: /<!-- headContent -->/,
}

const keys = [
  'bodyContent',
  'htmlAttributes',
  'preloadDumpScript',
  'headContent',
] as const
