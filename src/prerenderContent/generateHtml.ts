export async function generateHtml(
  baseHtmlTemplate: string,
  data: {
    bodyAttributes: string
    bodyContent: string
    headContent: string
    htmlAttributes: string
    meta: string
    preloadDumpScript: string
    style: string
  },
): Promise<string> {
  return keys.reduce((html, key) => {
    const re = replacements[key]
    if (html.match(re)) return html.replace(re, () => data[key])
    throw new Error(`Missing placeholder for ${key} in index.html.`)
  }, baseHtmlTemplate)
}

const replacements: Record<(typeof keys)[number], RegExp> = {
  bodyAttributes: /data-body-attributes(="")?/,
  bodyContent:
    /\n *<!-- body-content start -->[^!]*<!-- body-content end -->\s*/,
  headContent: /<!-- head-content -->/,
  htmlAttributes: /data-html-attributes(="")?/,
  meta: /<!-- meta -->/,
  preloadDumpScript: /<!-- preload-dump-script -->/,
  style: /<!-- style -->/,
}

const keys = [
  'bodyAttributes',
  'bodyContent',
  'headContent',
  'htmlAttributes',
  'meta',
  'preloadDumpScript',
  'style',
] as const
