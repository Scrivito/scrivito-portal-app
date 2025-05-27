import dns from 'dns'
import fs from 'fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import honeybadgerRollupPlugin from '@honeybadger-io/rollup-plugin'
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

  // This flag is only used by the Scrivito SDK team (e.g. for multi-tenancy).
  // Feel free to remove it in your project.
  const privateJrPlatform = env.PRIVATE_JR_PLATFORM === 'true'

  const HONEYBADGER_API_KEY = env.HONEYBADGER_API_KEY || ''
  const HONEYBADGER_ENVIRONMENT = privateJrPlatform
    ? getJrHoneybadgerEnvironment(env)
    : 'Development'
  const HONEYBADGER_REVISION = env.CF_PAGES_COMMIT_SHA || 'unknown'

  ensureScrivitoTenantIsPresent(env)

  return {
    build: {
      outDir,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          _scrivito_extensions: resolve(__dirname, '_scrivito_extensions.html'),
        },
        plugins: [
          HONEYBADGER_API_KEY
            ? honeybadgerRollupPlugin({
                apiKey: HONEYBADGER_API_KEY,
                assetsUrl: 'https://*',
                revision: HONEYBADGER_REVISION,
              })
            : {},
        ],
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
      sourcemap: !!HONEYBADGER_API_KEY,
    },
    define: {
      'import.meta.env.SCRIVITO_ORIGIN': JSON.stringify(scrivitoOrigin(env)),
      'import.meta.env.SCRIVITO_ROOT_OBJ_ID': JSON.stringify(
        env.SCRIVITO_ROOT_OBJ_ID || 'c2a0aab78be05a4e',
      ),
      'import.meta.env.HONEYBADGER_API_KEY':
        JSON.stringify(HONEYBADGER_API_KEY),
      'import.meta.env.HONEYBADGER_ENVIRONMENT': JSON.stringify(
        HONEYBADGER_ENVIRONMENT,
      ),
      'import.meta.env.HONEYBADGER_REVISION':
        JSON.stringify(HONEYBADGER_REVISION),
      'import.meta.env.FORCE_LOCAL_STORAGE': JSON.stringify(forceLocalStorage),
      'import.meta.env.PRIVATE_JR_PLATFORM': true,
    },
    optimizeDeps: {
      force: true,
    },
    plugins: [react(), writeProductionHeaders(outDir)],
    preview: {
      port: 8080,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@honeybadger-io/js': HONEYBADGER_API_KEY
          ? '@honeybadger-io/js'
          : resolve(__dirname, 'src/honeybadgerStub.ts'),
      },
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

export function getJrHoneybadgerEnvironment(
  env: Record<string, string>,
): string {
  if (env.CF_PAGES_BRANCH === 'prod') return 'Production'
  if (env.CF_PAGES_BRANCH === 'sam-v6') return 'Production'
  if (env.CF_PAGES_BRANCH === 'v6') return 'Production'

  if (env.CF_PAGES_BRANCH === 'main') return 'Staging'
  if (env.CF_PAGES_BRANCH === 'pisa') return 'Staging'

  if (env.CF_PAGES) return 'PR Preview'

  return 'Development'
}
