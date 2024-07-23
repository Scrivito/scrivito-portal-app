import * as ReactDOMServer from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { App, helmetContext } from '../App'
import { contentHash } from './contentHash'
import { filenameFromUrl } from './filenameFromUrl'
import { generateHtml } from './generateHtml'
import { generatePreloadDump } from './generatePreloadDump'
import { Obj, renderPage, urlFor } from 'scrivito'

export async function prerenderObj(
  obj: Obj,
  baseHtmlTemplate: string,
): Promise<{ filename: string; content: string }[]> {
  HelmetProvider.canUseDOM = false

  const { result, preloadDump } = await renderPage(obj, () => {
    const bodyContent = ReactDOMServer.renderToString(<App />)
    const { helmet } = helmetContext

    return {
      objId: obj.id(),
      objUrl: urlFor(obj),
      htmlAttributes: helmet?.htmlAttributes.toString() || '',
      headContent: `
          ${helmet?.title.toString()}
          ${helmet?.meta.toString()}
          ${helmet?.link.toString()}
        `,
      bodyAttributes: helmet?.bodyAttributes.toString() || '',
      bodyContent,
    }
  })

  const {
    bodyAttributes,
    bodyContent,
    headContent,
    htmlAttributes,
    objId,
    objUrl,
  } = result
  const preloadDumpFileContent = generatePreloadDump(preloadDump)
  const preloadDumpContentHash = await contentHash(preloadDumpFileContent)
  const preloadDumpFileName = `/assets/preloadDumps/${objId}.${preloadDumpContentHash}.js`
  const preloadDumpScript = `<script type="module" src="${preloadDumpFileName}"></script>`

  return [
    {
      filename: preloadDumpFileName,
      content: preloadDumpFileContent,
    },
    {
      filename: filenameFromUrl(objUrl),
      content: await generateHtml(baseHtmlTemplate, {
        bodyAttributes,
        bodyContent,
        headContent,
        htmlAttributes,
        preloadDumpScript,
      }),
    },
  ]
}
