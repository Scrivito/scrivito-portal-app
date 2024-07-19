import dns from 'dns'
import fs from 'fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { productionHeaders, developmentHeaders } from './headers.config'

// Ensure, that vite prints "localhost" instead of 127.0.0.1
// See https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const outDir = 'dist'

  const forceLocalStorage = env.FORCE_LOCAL_STORAGE === 'true'
  const privateJrPlatform = env.PRIVATE_JR_PLATFORM === 'true'

  ensureScrivitoTenantIsPresent(env)

  return {
    build: {
      outDir,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          _scrivito_extensions: resolve(__dirname, '_scrivito_extensions.html'),
        },
        output: {
          manualChunks: {
            react: [
              'react-bootstrap',
              'react-dropzone',
              'react-helmet-async',
              'react-toastify',
            ],
            scrivito: ['scrivito-neoletter-form-widgets'],
          },
        },
      },
    },
    define: {
      'import.meta.env.SCRIVITO_ORIGIN': JSON.stringify(scrivitoOrigin(env)),
      'import.meta.env.SCRIVITO_TENANT': JSON.stringify(env.SCRIVITO_TENANT),
      'import.meta.env.SCRIVITO_ROOT_OBJ_ID': JSON.stringify(
        env.SCRIVITO_ROOT_OBJ_ID || 'c2a0aab78be05a4e',
      ),
      'import.meta.env.FORCE_LOCAL_STORAGE': JSON.stringify(forceLocalStorage),
      'import.meta.env.PRIVATE_JR_PLATFORM': JSON.stringify(privateJrPlatform),
    },
    // https://github.com/vitejs/vite/discussions/3448
    esbuild: {
      loader: 'tsx',
      include: /src\/.*\.[jt]sx?$/,
      exclude: [],
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        plugins: [
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                loader: 'jsx',
                contents: fs.readFileSync(args.path, 'utf8'),
              }))
            },
          },
        ],
      },
    },
    plugins: [react(), writeProductionHeaders(outDir)],
    preview: {
      port: 8080,
      strictPort: true,
    },
    server: {
      port: 8080,
      strictPort: true,
      headers: developmentHeaders(),
      proxy: {
        '/auth': {
          target: 'https://api.justrelate.com/iam/auth',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth/, ''),
          headers: { 'X-JR-Auth-Location': 'http://localhost:8080/auth' },
        },
      },
    },
  }
})

function ensureScrivitoTenantIsPresent(env: Record<string, string>): void {
  if (env.PRIVATE_JR_PLATFORM === 'true') return
  if (typeof env.SCRIVITO_TENANT === 'string' && env.SCRIVITO_TENANT) return

  throw new Error(
    'Environment variable "SCRIVITO_TENANT" is not defined!' +
      ' Check if the ".env" or `.env.local` file is set with a proper SCRIVITO_TENANT.' +
      ' See ".env.example" for an example.',
  )
}

function scrivitoOrigin(env: Record<string, string>) {
  /** @see https://docs.netlify.com/configure-builds/environment-variables/ */
  const netlifyDeployUrl =
    env.CONTEXT === 'production' ? env.URL : env.DEPLOY_PRIME_URL

  /** @see https://developers.cloudflare.com/pages/configuration/build-configuration/ */
  const cloudflarePagesDeployUrl = env.CF_PAGES_URL

  return env.SCRIVITO_ORIGIN || cloudflarePagesDeployUrl || netlifyDeployUrl
}

function writeProductionHeaders(outDir: string) {
  return {
    name: 'write-production-headers',
    apply: 'build' as const,
    async writeBundle() {
      await fs.promises.writeFile(
        resolve(__dirname, outDir, '_headers'),
        productionHeaders(),
      )
    },
  }
}
