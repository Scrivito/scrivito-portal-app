export async function generateHtml(
  baseHtmlTemplate: string,
  data: {
    bodyAttributes: string
    bodyContent: string
    headContent: string
    htmlAttributes: string
    preloadDumpScript: string
  },
): Promise<string> {
  return keys.reduce((html, key) => {
    const re = replacements[key]
    if (html.match(re)) return html.replace(re, () => data[key])
    throw new Error(`Missing placeholder for ${key} in index.html.`)
  }, baseHtmlTemplate)
}

const replacements = {
  bodyAttributes: /data-bodyAttributes/,
  bodyContent: /\n *<!-- bodyContent start -->[^!]*<!-- bodyContent end -->\s*/,
  headContent: /\n *<!-- headContent -->\s*/,
  htmlAttributes: /data-htmlAttributes/,
  preloadDumpScript: /\n *<!-- preloadDumpScript -->\s*/,
}

const keys = [
  'bodyAttributes',
  'bodyContent',
  'headContent',
  'htmlAttributes',
  'preloadDumpScript',
] as const
