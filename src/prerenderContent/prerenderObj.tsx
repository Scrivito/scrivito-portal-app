import * as ReactDOMServer from 'react-dom/server'
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
  const {
    result: { objId, objUrl, ...data },
    preloadDump,
  } = await renderPage(obj, () => {
    const rawBodyContent = ReactDOMServer.renderToString(<App />)
    const { helmet } = helmetContext
    const { title, bodyContent } = extractTitle(rawBodyContent)

    return {
      bodyAttributes: helmet?.bodyAttributes.toString() || '',
      bodyContent,
      htmlAttributes: helmet?.htmlAttributes.toString() || '',
      objId: obj.id(),
      objUrl: urlFor(obj),
      title,
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

function extractTitle(html: string): {
  title: string
  bodyContent: string
} {
  const titleMatch = html.match(/<title[^>]*>.*?<\/title>/i)
  const title = titleMatch ? titleMatch[0] : ''
  const bodyContent = title ? html.replace(title, '') : html

  return { title, bodyContent }
}
