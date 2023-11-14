import fse from 'fs-extra'
import childProcess from 'child_process'

const TARGET_DIR = 'vendor/scrivito'
const SCRIVITO_CONFIG_PATCH = `diff --git a/src/config/scrivito.ts b/src/config/scrivito.ts
index ea6e150..f99b47d 100644
--- a/src/config/scrivito.ts
+++ b/src/config/scrivito.ts
@@ -15,6 +15,7 @@ export function configureScrivito() {
         'https://*.netlify.app',
         'https://*.pages.dev',
       ],
+      assetUrlBase: '/scrivito',
     },
   }
`

// Vite patch is needed, as long as scrivito still ships with commonjs (see https://github.com/infopark/scrivito_js/issues/9064)
// More infos see https://vitejs.dev/guide/dep-pre-bundling.html
const VITE_CONFIG_PATCH = `diff --git a/vite.config.ts b/vite.config.ts
index 749566b..f52657e 100644
--- a/vite.config.ts
+++ b/vite.config.ts
@@ -13,6 +13,9 @@ export default defineConfig(({ mode }) => {

   return {
     build: {
+      commonjsOptions: {
+        include: [/scrivito/, /node_modules/],
+      },
       rollupOptions: {
         input: {
           main: resolve(__dirname, 'index.html'),
@@ -20,6 +23,9 @@ export default defineConfig(({ mode }) => {
         },
       },
     },
+    optimizeDeps: {
+      include: ['scrivito'],
+    },
     define: {
       'import.meta.env.SCRIVITO_TENANT': JSON.stringify(env.SCRIVITO_TENANT),
       'import.meta.env.ENABLE_NEOLETTER_FORM_BUILDER_SUBSCRIPTION_FEATURE':
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
