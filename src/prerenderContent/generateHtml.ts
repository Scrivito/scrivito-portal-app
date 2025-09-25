export async function generateHtml(
  baseHtmlTemplate: string,
  data: {
    bodyAttributes: string
    bodyContent: string
    htmlAttributes: string
    preloadDumpScript: string
    style: string
    title: string
  },
): Promise<string> {
  return keys.reduce((html, key) => {
    const re = replacements[key]
    if (html.match(re)) return html.replace(re, () => data[key])
    throw new Error(`Missing placeholder for ${key} in index.html.`)
  }, baseHtmlTemplate)
}

const replacements: Record<(typeof keys)[number], RegExp> = {
  bodyAttributes: /data-bodyAttributes/,
  bodyContent: /\n *<!-- bodyContent start -->[^!]*<!-- bodyContent end -->\s*/,
  htmlAttributes: /data-htmlAttributes/,
  preloadDumpScript: /<!-- preloadDumpScript -->/,
  style: /<!-- style -->/,
  title: /<!-- title -->/,
}

const keys = [
  'bodyAttributes',
  'bodyContent',
  'htmlAttributes',
  'preloadDumpScript',
  'style',
  'title',
] as const
