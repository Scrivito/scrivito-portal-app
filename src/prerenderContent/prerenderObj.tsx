import * as ReactDOMServer from 'react-dom/server'
import { App } from '../App'
import { filenameFromUrl } from './filenameFromUrl'
import { generateHtml } from './generateHtml'
import { generatePreloadDumpScript } from './generatePreloadDumpScript'
import { Obj, renderPage, urlFor } from 'scrivito'

export async function prerenderObj(
  obj: Obj,
  baseHtmlTemplate: string,
): Promise<{ filename: string; content: string }> {
  const {
    result: { objUrl, ...data },
    preloadDump,
  } = await renderPage(obj, () => {
    const rawContent = ReactDOMServer.renderToString(
      <>
        <head />
        <App />
      </>,
    )
    const headMatch = rawContent.match(/^<head>(.*?)<\/head>(.*)$/s)
    const [, headContent, bodyContent] = headMatch ?? []
    if (headContent === undefined || bodyContent === undefined) {
      throw new Error(
        'Prerendered output does not contain a <head>...</head> block at the start.',
      )
    }

    return {
      bodyContent,
      headContent,
      // Scrivito ensures, that `obj.language()` is a valid lang attribute, so no escaping is needed
      htmlAttributes: `lang="${obj.language() || 'en'}"`,
      objUrl: urlFor(obj),
    }
  })

  const preloadDumpScript = generatePreloadDumpScript(preloadDump)

  return {
    filename: filenameFromUrl(objUrl),
    content: await generateHtml(baseHtmlTemplate, {
      ...data,
      preloadDumpScript,
    }),
  }
}
