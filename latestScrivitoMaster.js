import fse from 'fs-extra'
import childProcess from 'child_process'

const TARGET_DIR = 'vendor/scrivito'
const SCRIVITO_CONFIG_PATCH = `diff --git a/src/config/scrivito.ts b/src/config/scrivito.ts
index 4129f10..52e8ba0 100644
--- a/src/config/scrivito.ts
+++ b/src/config/scrivito.ts
@@ -9,6 +9,7 @@ export function configureScrivito() {
     tenant: import.meta.env.SCRIVITO_TENANT || '',
     // @ts-expect-error // TODO: Remove later on
     unstable: {
+      assetUrlBase: '/scrivito',
       trustedUiOrigins: [
         'http://localhost:8090',
         'https://*.netlify.app',
`

// Vite patch is needed, as long as scrivito still ships with commonjs (see https://github.com/infopark/scrivito_js/issues/9064)
// More infos see https://vitejs.dev/guide/dep-pre-bundling.html
const VITE_CONFIG_PATCH = `diff --git a/vite.config.ts b/vite.config.ts
index 4f46570..172a353 100644
--- a/vite.config.ts
+++ b/vite.config.ts
@@ -13,6 +13,9 @@ export default defineConfig(({ command, mode }) => {

   return {
     build: {
+      commonjsOptions: {
+        include: [/scrivito/, /node_modules/],
+      },
       rollupOptions: {
         input: {
           main: resolve(__dirname, 'index.html'),
@@ -32,5 +35,8 @@ export default defineConfig(({ command, mode }) => {
       port: 8080,
       strictPort: true,
     },
+    optimizeDeps: {
+      include: ['scrivito'],
+    },
   }
 })
`

run().catch((e) => {
  console.log('❌ Failed due to the following error -', e.message)
  process.exitCode = 1
})

async function run() {
  console.log('Building scrivito package')
  exec('cd ../scrivito_js/js && npm run package')

  console.log(`Removing ${TARGET_DIR}/`)
  await fse.remove(TARGET_DIR)

  console.log('Copying scrivito')
  await fse.copy('../scrivito_js/js/build/npm_scrivito/', TARGET_DIR)
  await fse.copy('../scrivito_js/js/build/scrivito', 'public/scrivito')

  console.log('Reinstalling scrivito npm package')
  exec('npm remove scrivito')
  exec('npm i file:vendor/scrivito')
  exec('npm i')

  console.log('Configuring new asset location')
  try {
    exec(`echo "${SCRIVITO_CONFIG_PATCH}" | git apply`)
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
