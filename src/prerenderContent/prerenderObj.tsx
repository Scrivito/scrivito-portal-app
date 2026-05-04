import * as ReactDOMServer from 'react-dom/server'
import { App, helmetContext } from '../App'
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
    const bodyContent = ReactDOMServer.renderToString(<App />)
    const { helmet } = helmetContext

    return {
      bodyAttributes: helmet?.bodyAttributes.toString() || '',
      bodyContent,
      htmlAttributes: helmet?.htmlAttributes.toString() || '',
      link: helmet?.link.toString() || '',
      meta: helmet?.meta.toString() || '',
      objUrl: urlFor(obj),
      style: helmet?.style.toString() || '',
      title: helmet?.title.toString() || '',
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
