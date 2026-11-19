import { createHash } from 'crypto'
import dns from 'dns'
import fs from 'fs'
import { defineConfig, loadEnv } from 'vite'
import type { Rollup } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-expect-error The package ships no types, see https://github.com/honeybadger-io/honeybadger-js/pull/1693
import honeybadgerRollupPlugin from '@honeybadger-io/rollup-plugin'
import { resolve } from 'path'
import {
  DEV_CSP_NONCE,
  developmentHeaders,
  parseProductionHeadersFile,
  productionHeadersFile,
} from './headers.config.ts'

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

  return {
    build: {
      outDir,
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          _scrivito_extensions: resolve(
            import.meta.dirname,
            '_scrivito_extensions.html',
          ),
        },
        plugins: [
          HONEYBADGER_API_KEY
            ? honeybadgerRollupPlugin({
                apiKey: HONEYBADGER_API_KEY,
                assetsUrl: 'https://*',
                revision: HONEYBADGER_REVISION,
              })
            : null,
        ],
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'react',
                test: /node_modules\/(react-bootstrap|react-dropzone|react-toastify)/,
              },
              {
                name: 'scrivito',
                test: /node_modules\/scrivito-neoletter-form-widgets\/index/,
              },
            ],
          },
        },
      },
      sourcemap: !!HONEYBADGER_API_KEY,
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['src/assets/stylesheets/vendor'],
          quietDeps: true,
        },
      },
    },
    define: {
      'import.meta.env.SCRIVITO_DEFAULT_CONTENT_ID': JSON.stringify(
        env.SCRIVITO_DEFAULT_CONTENT_ID || 'c2a0aab78be05a4e',
      ),
      'import.meta.env.SCRIVITO_ORIGIN': JSON.stringify(scrivitoOrigin(env)),
      'import.meta.env.SCRIVITO_INSTANCE_ID': JSON.stringify(
        getScrivitoInstanceId(env),
      ),
      'import.meta.env.HONEYBADGER_API_KEY':
        JSON.stringify(HONEYBADGER_API_KEY),
      'import.meta.env.HONEYBADGER_ENVIRONMENT': JSON.stringify(
        HONEYBADGER_ENVIRONMENT,
      ),
      'import.meta.env.HONEYBADGER_REVISION':
        JSON.stringify(HONEYBADGER_REVISION),
      'import.meta.env.FORCE_LOCAL_STORAGE': JSON.stringify(forceLocalStorage),
      'import.meta.env.PRIVATE_JR_PLATFORM': JSON.stringify(privateJrPlatform),
      'import.meta.env.PISA_SALES_API_URL': JSON.stringify(
        env.PISA_SALES_API_URL,
      ),
    },
    html: {
      ...(mode === 'development' && { cspNonce: DEV_CSP_NONCE }),
    },
    optimizeDeps: {
      force: true,
    },
    plugins: [react(), writeProductionHeadersFile(outDir)],
    preview: {
      port: 8080,
      strictPort: true,
      headers: readProductionHeadersFile(outDir),
    },
    resolve: {
      alias: {
        '@honeybadger-io/js': HONEYBADGER_API_KEY
          ? '@honeybadger-io/js'
          : resolve(import.meta.dirname, 'src/honeybadgerStub.ts'),
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

function getScrivitoInstanceId(env: Record<string, string>): string | null {
  const scrivitoTenant = env.SCRIVITO_TENANT
  const instanceId = env.SCRIVITO_INSTANCE_ID || scrivitoTenant

  if (typeof instanceId === 'string' && instanceId) {
    if (scrivitoTenant) {
      console.warn(
        'DEPRECATION WARNING: SCRIVITO_TENANT is deprecated. Please use SCRIVITO_INSTANCE_ID instead.',
      )
    }
    return instanceId
  }

  if (env.PRIVATE_JR_PLATFORM === 'true') return null

  throw new Error(
    'Environment variable "SCRIVITO_INSTANCE_ID" is not defined!' +
      ' Check if the ".env" or `.env.local` file is set with a proper SCRIVITO_INSTANCE_ID.' +
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

function writeProductionHeadersFile(outDir: string) {
  return {
    name: 'write-production-headers',
    apply: 'build' as const,
    enforce: 'post' as const,

    generateBundle: {
      order: 'post' as const,
      async handler(_options: unknown, bundle: Rollup.OutputBundle) {
        const htmlAssets = Object.values(bundle).filter(
          (item): item is Rollup.OutputAsset & { source: string } =>
            item.type === 'asset' && typeof item.source === 'string',
        )

        const scriptHashes = new Set<string>()

        for (const chunk of Object.values(bundle)) {
          if (chunk.type !== 'chunk' || !chunk.isEntry) continue

          const entryTag = `<script type="module" crossorigin src="/${chunk.fileName}"></script>`
          const integrity = sha384(chunk.code)
          const bootstrap = entryBootstrapScript(chunk.fileName, integrity)
          scriptHashes.add(`'${sha384(bootstrap)}'`)

          for (const html of htmlAssets) {
            html.source = html.source.replaceAll(
              entryTag,
              `<link rel="modulepreload" crossorigin href="/${chunk.fileName}" integrity="${integrity}">` +
                `<script>${bootstrap}</script>`,
            )
          }
        }

        for (const html of htmlAssets) {
          if (/<script[^>]+type="module"[^>]+src=/.test(html.source)) {
            throw new Error(
              `${html.fileName}: Found an unhandled parser-inserted module script.` +
                " It would be blocked by the CSP's 'strict-dynamic'.",
            )
          }
        }

        await fs.promises.writeFile(
          resolve(import.meta.dirname, outDir, '_headers'),
          productionHeadersFile([...scriptHashes]),
        )
      },
    },
  }
}

function sha384(content: string): string {
  return `sha384-${createHash('sha384').update(content).digest('base64')}`
}

/**
 * Returns an inline (CSP hash-allowed) script, which inserts the entry module
 * script once the document is parsed (like a deferred module script).
 *
 * A script inserted via `document.createElement` is "not parser-inserted".
 * Thanks to `'strict-dynamic'` it and its whole module graph are allowed
 * to load. A parser-inserted `<script type="module">` (as emitted by Vite)
 * only passes CSP itself via its integrity hash, but its imports do not.
 * Chrome < 158 let them through due to a CSP bypass via `modulepreload`,
 * see https://crbug.com/515948871.
 */
function entryBootstrapScript(fileName: string, integrity: string): string {
  const props = JSON.stringify({
    type: 'module',
    crossOrigin: '',
    integrity,
    src: `/${fileName}`,
  })

  return (
    `(()=>{const l=()=>document.head.append(Object.assign(document.createElement('script'),${props}));` +
    `document.readyState==='loading'?document.addEventListener('DOMContentLoaded',l):l()})()`
  )
}

function readProductionHeadersFile(outDir: string) {
  const headersPath = resolve(import.meta.dirname, outDir, '_headers')
  if (!fs.existsSync(headersPath)) return {}
  const headersContent = fs.readFileSync(headersPath, 'utf-8')
  return parseProductionHeadersFile(headersContent)
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
