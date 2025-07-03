import path from 'path'
import './Objs'
import './Widgets'
import { configureScrivito } from './config/scrivito'
import { prerenderObjs } from './prerenderContent/prerenderObjs'
import { prerenderSitemap } from './prerenderContent/prerenderSitemap'
import { reportPrerenderError } from './prerenderContent/reportPrerenderError'
import { cp, readFile, rm } from 'fs/promises'

configureScrivito({ priority: 'background' })

const PRERENDER_OBJ_CLASSES_BLACKLIST = [
  'Download',
  'Dropdown',
  'Font',
  'Image',
  'Redirect',
  'Video',
]

const SITEMAP_OBJ_CLASSES_WHITELIST = [
  'Homepage',
  'Page',
  'Product',
  'ProductCategory',
  'ProductsOverview',
]

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

  await prerenderSitemap(TARGET_DIR, SITEMAP_OBJ_CLASSES_WHITELIST)

  const objFiles = await prerenderObjs(
    TARGET_DIR,
    PRERENDER_OBJ_CLASSES_BLACKLIST,
    baseHtmlTemplate,
  )

  console.log(
    `  📦 [prerenderContent] Added ${objFiles.length} files to ${TARGET_DIR}.`,
  )

  console.timeEnd('[prerenderContent]')
}

prerenderContent().catch((e) => {
  process.exitCode = 1
  return reportPrerenderError('A prerendering error occurred!', e)
})
