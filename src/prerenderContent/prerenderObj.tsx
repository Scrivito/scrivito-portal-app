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

  const {
    result: { objId, objUrl, ...data },
    preloadDump,
  } = await renderPage(obj, () => {
    const bodyContent = ReactDOMServer.renderToString(<App />)
    const { helmet } = helmetContext

    return {
      bodyAttributes: helmet?.bodyAttributes.toString() || '',
      bodyContent,
      htmlAttributes: helmet?.htmlAttributes.toString() || '',
      link: helmet?.link.toString() || '',
      meta: helmet?.meta.toString() || '',
      objId: obj.id(),
      objUrl: urlFor(obj),
      title: helmet?.title.toString() || '',
    }
  })

  const preloadDumpFileContent = generatePreloadDump(preloadDump)
  const preloadDumpContentHash = await contentHash(preloadDumpFileContent)
  const preloadDumpFileName = `/assets/preloadDumps/${objId}.${preloadDumpContentHash}.js`
  const preloadDumpScript = `<script type="module" src="${preloadDumpFileName}"></script>`

  return [
    { filename: preloadDumpFileName, content: preloadDumpFileContent },
    {
      filename: filenameFromUrl(objUrl),
      content: await generateHtml(baseHtmlTemplate, {
        ...data,
        preloadDumpScript,
      }),
    },
  ]
}
