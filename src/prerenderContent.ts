import path from 'path'
import './Objs'
import './Widgets'
import { configureScrivito } from './config/scrivito'
import { extendRedirects } from './prerenderContent/extendRedirects'
import { prerenderObjs } from './prerenderContent/prerenderObjs'
import { prerenderSitemap } from './prerenderContent/prerenderSitemap'
import { reportError } from './prerenderContent/reportError'
import { cp, readFile, rename, rm } from 'fs/promises'

configureScrivito({ priority: 'background' })

const PRERENDER_OBJ_CLASSES_BLACKLIST = [
  'Download',
  'Image',
  'Redirect',
  'Video',
]

const SITEMAP_OBJ_CLASSES_WHITELIST = ['Homepage', 'Page']

const SOURCE_DIR = 'dist'
const TARGET_DIR = 'dist-ssr'

async function prerenderContent() {
  console.time('[prerenderContent]')

  if (!import.meta.env.SCRIVITO_ORIGIN) {
    throw new Error(
      'The environment variable "SCRIVITO_ORIGIN" is not defined.' +
        ' Prerendered pages need a configured origin.',
    )
  }

  const baseHtmlTemplate = await readFile(
    path.join(SOURCE_DIR, 'index.html'),
    'utf-8',
  )

  console.log(`  📦 [prerenderContent] Removing ${TARGET_DIR}/`)
  await rm(TARGET_DIR, { recursive: true, force: true })

  console.log(
    `  📦 [prerenderContent] Copying ${SOURCE_DIR}/ to ${TARGET_DIR}/`,
  )
  await cp(SOURCE_DIR, TARGET_DIR, { recursive: true })

  await rename(
    path.join(TARGET_DIR, 'index.html'),
    path.join(TARGET_DIR, 'catch_all_index.html'),
  )

  await prerenderSitemap(TARGET_DIR, SITEMAP_OBJ_CLASSES_WHITELIST)

  const objFiles = await prerenderObjs(
    TARGET_DIR,
    PRERENDER_OBJ_CLASSES_BLACKLIST,
    baseHtmlTemplate,
  )

  await extendRedirects(TARGET_DIR, objFiles, SOURCE_DIR)

  console.log(
    `  📦 [prerenderContent] Added ${objFiles.length} files to ${TARGET_DIR}.`,
  )

  console.timeEnd('[prerenderContent]')
}

prerenderContent().catch((e) => {
  reportError('An error occurred!', e)
  process.exitCode = 1
})
