export async function generateHtml(
  baseHtmlTemplate: string,
  data: {
    bodyContent: string
    htmlAttributes: string
    preloadDumpScript: string
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
  bodyContent: /\n *<!-- bodyContent start -->[^!]*<!-- bodyContent end -->\s*/,
  htmlAttributes: /data-htmlAttributes/,
  preloadDumpScript: /<!-- preloadDumpScript -->/,
  title: /<!-- title -->/,
}

const keys = [
  'bodyContent',
  'htmlAttributes',
  'preloadDumpScript',
  'title',
] as const
