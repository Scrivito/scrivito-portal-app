export async function generateHtml(
  baseHtmlTemplate: string,
  data: {
    bodyAttributes: string
    bodyContent: string
    htmlAttributes: string
    link: string
    meta: string
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

const replacements = {
  bodyAttributes: /data-bodyAttributes/,
  bodyContent: /\n *<!-- bodyContent start -->[^!]*<!-- bodyContent end -->\s*/,
  htmlAttributes: /data-htmlAttributes/,
  link: /<!-- link -->/,
  meta: /<!-- meta -->/,
  preloadDumpScript: /<!-- preloadDumpScript -->/,
  title: /<!-- title -->/,
}

const keys = [
  'bodyAttributes',
  'bodyContent',
  'htmlAttributes',
  'link',
  'meta',
  'preloadDumpScript',
  'title',
] as const
