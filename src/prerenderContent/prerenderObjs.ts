import { chunk } from 'lodash-es'
import { prerenderObj } from './prerenderObj'
import { reportPrerenderError } from './reportPrerenderError'
import { storeResult } from './storeResult'
import { getSiteIds } from './getSiteIds'
import { load, Obj, urlFor } from 'scrivito'

export async function prerenderObjs(
  targetDir: string,
  objClassesBlacklist: string[],
  baseHtmlTemplate: string,
): Promise<string[]> {
  console.time('[prerenderObjs]')

  console.time('  🔎 [prerenderObjs] Loading all objs')
  const objs = await load(() => allObjs(objClassesBlacklist))
  console.timeEnd('  🔎 [prerenderObjs] Loading all objs')
  console.log(`  🔎 [prerenderObjs] Loaded ${objs.length} objs`)

  let failedCount = 0
  const files: string[] = []
  const storeFile = async (file: { filename: string; content: string }) => {
    const storedFile = await storeResult(targetDir, file)
    if (storedFile) files.push(storedFile)
  }

  const objsGroups = chunk(objs, 10)
  await asyncForEachSequential(objsGroups, async (objsGroup) =>
    asyncForEach(objsGroup, async (obj) => {
      try {
        const prerenderedFiles = await prerenderObj(obj, baseHtmlTemplate)
        await asyncForEachSequential(prerenderedFiles, storeFile)
      } catch (e) {
        failedCount += 1
        const pageId = obj.id()
        const pageUrl = urlFor(obj)
        await reportPrerenderError(
          `Error while processing obj ${pageId} (${pageUrl}).`,
          e,
        )
      }
    }),
  )

  console.timeEnd('[prerenderObjs]')
  if (failedCount) {
    throw new Error(`${failedCount} objs failed to prerender.`)
  }

  return files
}

function allObjs(objClassesBlacklist: string[]) {
  const prerenderObjId = process.env.PRERENDER_OBJ_ID
  if (prerenderObjId) {
    const root = Obj.onAllSites().get(prerenderObjId)
    if (root) return [root]
    throw new Error(`Prerender obj not found: ${prerenderObjId}`)
  }

  return Obj.onAllSites()
    .where('_siteId', 'equals', getSiteIds())
    .andNot('_objClass', 'equals', objClassesBlacklist)
    .take()
}

async function asyncForEach<T>(items: T[], fn: (_: T) => Promise<void>) {
  return Promise.all(items.map(fn))
}

async function asyncForEachSequential<T>(
  items: T[],
  fn: (_: T) => Promise<unknown>,
) {
  return items.reduce(async (promise: Promise<unknown>, item: T) => {
    await promise
    return fn(item)
  }, Promise.resolve(true))
}
