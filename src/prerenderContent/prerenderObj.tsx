import * as ReactDOMServer from 'react-dom/server'
import { App } from '../App'
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
    const rawBodyContent = ReactDOMServer.renderToString(
      <>
        <head />
        <App />
      </>,
    )
    const { headContent, bodyContent } = extractHead(rawBodyContent)

    return {
      bodyContent,
      htmlAttributes: `lang="${obj.language() || 'en'}"`,
      objId: obj.id(),
      objUrl: urlFor(obj),
      headContent,
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

function extractHead(html: string): {
  headContent: string
  bodyContent: string
} {
  const parts = html.split('</head>')
  const [firstSegment, bodyContent, ...restParts] = parts
  if (
    typeof firstSegment !== 'string' ||
    typeof bodyContent !== 'string' ||
    restParts.length > 0
  ) {
    throw new Error('Could not extract head from HTML')
  }

  const [emptyString, headContent, ...restHeads] = firstSegment.split('<head>')
  if (emptyString || typeof headContent !== 'string' || restHeads.length > 0) {
    throw new Error('Could not extract head from HTML')
  }

  return { headContent, bodyContent }
}
