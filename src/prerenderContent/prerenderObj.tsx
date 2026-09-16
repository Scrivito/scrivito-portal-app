import * as ReactDOMServer from 'react-dom/server'
import { type HelmetServerState } from '@dr.pogodin/react-helmet'
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
    let helmet: HelmetServerState | undefined
    const rawContent = ReactDOMServer.renderToString(
      <>
        <head />
        <App
          onServerState={(s) => {
            helmet = s
          }}
        />
      </>,
    )
    const { headContent, bodyContent } = splitHead(rawContent)

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

const HEAD_START = '<head>'
const HEAD_END = '</head>'

function splitHead(html: string): { headContent: string; bodyContent: string } {
  if (!html.startsWith(HEAD_START)) {
    throw new Error('Prerendered output does not start with <head>.')
  }

  const end = html.indexOf(HEAD_END)
  if (end === -1) {
    throw new Error('Prerendered output contains no </head>.')
  }

  return {
    headContent: html.slice(HEAD_START.length, end),
    bodyContent: html.slice(end + HEAD_END.length),
  }
}
