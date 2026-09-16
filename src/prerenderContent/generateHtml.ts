export async function generateHtml(
  baseHtmlTemplate: string,
  data: {
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

const replacements: Record<(typeof keys)[number], RegExp> = {
  bodyContent:
    /\n *<!-- body-content start -->[^!]*<!-- body-content end -->\s*/,
  headContent: /<!-- head-content -->/,
  htmlAttributes: /data-html-attributes(="")?/,
  preloadDumpScript: /<!-- preload-dump-script -->/,
}

const keys = [
  'bodyContent',
  'headContent',
  'htmlAttributes',
  'preloadDumpScript',
] as const
