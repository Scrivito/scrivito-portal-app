import fse from 'fs-extra'
import childProcess from 'child_process'

const TARGET_DIR = 'vendor/scrivito'
const JR_PLATFORM_CONFIG_PATCH = `diff --git a/src/privateJrPlatform/getJrPlatformConfig.ts b/src/privateJrPlatform/getJrPlatformConfig.ts
index 898212ef1..27957d038 100644
--- a/src/privateJrPlatform/getJrPlatformConfig.ts
+++ b/src/privateJrPlatform/getJrPlatformConfig.ts
@@ -1,6 +1,7 @@
 export function getJrPlatformConfig() {
   return {
     unstable: {
+      assetUrlBase: '/scrivito',
       initialContentDumpUrl:
         'https://v6-content.scrivito-portal-app.pages.dev/index.json',
       trustedUiOrigins: [
`

// Vite patch is needed, as long as scrivito still ships with commonjs (see https://github.com/infopark/scrivito_js/issues/9064)
// More infos see https://vitejs.dev/guide/dep-pre-bundling.html
const VITE_CONFIG_PATCH = `diff --git a/vite.config.ts b/vite.config.ts
index 611f8d62..dca2678a 100644
--- a/vite.config.ts
+++ b/vite.config.ts
@@ -37,6 +37,9 @@ export default defineConfig(({ mode }) => {
   return {
     build: {
       outDir,
+      commonjsOptions: {
+        include: [/scrivito/, /node_modules/],
+      },
       rollupOptions: {
         input: {
           main: resolve(import.meta.dirname, 'index.html'),
@@ -97,6 +100,7 @@ export default defineConfig(({ mode }) => {
     },
     optimizeDeps: {
       force: true,
+      include: ['scrivito'],
     },
     plugins: [react(), writeProductionHeadersFile(outDir)],
     preview: {
`

run().catch((e) => {
  console.log('❌ Failed due to the following error -', e.message)
  process.exitCode = 1
})

async function run() {
  console.log('Building scrivito package')
  exec(
    'cd ../scrivito_js/js && npm run package:cleanUp && npm run package:sdk && npm run package:sdk:types',
  )

  console.log(`Removing ${TARGET_DIR}/`)
  await fse.remove(TARGET_DIR)
  await fse.remove('public/scrivito')

  console.log('Copying scrivito')
  await fse.copy('../scrivito_js/js/build/npm_scrivito/', TARGET_DIR)
  await fse.copy('../scrivito_js/js/build/scrivito_ui', 'public/scrivito')

  console.log('Reinstalling scrivito npm package')
  exec('npm remove scrivito')
  exec('npm i file:vendor/scrivito')
  exec('npm i')

  console.log('Configuring new asset location')
  try {
    exec(`echo "${JR_PLATFORM_CONFIG_PATCH}" | git apply`)
  } catch {
    console.log(`❌ Could not apply scrivito config patch, ignoring`)
  }

  console.log('Configuring vite')
  try {
    exec(`echo "${VITE_CONFIG_PATCH}" | git apply`)
  } catch {
    console.log(`❌ Could not apply vite config patch, ignoring`)
  }

  console.log(`✅ Done.`)
}

function exec(cmd) {
  return childProcess.execSync(cmd, { stdio: [0, 1, 2] })
}
