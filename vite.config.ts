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

  return {
    build: {
      outDir,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          _scrivito_extensions: resolve(__dirname, '_scrivito_extensions.html'),
        },
      },
    },
    define: {
      'import.meta.env.SCRIVITO_TENANT': JSON.stringify(env.SCRIVITO_TENANT),
      'import.meta.env.ENABLE_NEOLETTER_FORM_BUILDER_SUBSCRIPTION_FEATURE':
        JSON.stringify(env.ENABLE_NEOLETTER_FORM_BUILDER_SUBSCRIPTION_FEATURE),
    },
    optimizeDeps: {
      force: true,
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
        '/jr-api': {
          target: 'https://api.justrelate.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/jr-api/, ''),
          headers: { 'X-JR-API-Location': 'http://localhost:8080/jr-api' },
        },

        '/pisa-api': {
          target: 'https://web102.crm.pisasales.de/portal',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/pisa-api/, ''),
        },

        /**
         * Example Proxy
         *
         * This is the configuration for localhost/127.0.0.1.
         * For Cloudflare Pages see `/functions/example-proxy/[[catchall]].ts`.
         * Please also adjust `const RELOAD_SUBPATHS` in `NotFoundErrorPage.tsx`.
         *
         * Example usage: `Scrivito.unstable_JrRestApi.fetch('../example-proxy/some.json')`
         */
        '/example-proxy': {
          target: 'https://myservice.example.com/api',
          rewrite: (path) => {
            // TODO: 🛑🚧🛑 Remove the following Error, once target and
            // the `/example-proxy` prefix are adjusted to your needs.
            throw new Error(
              'Incomplete example-proxy configuration! See `vite.config.ts` for details.',
            )

            return path.replace(/^\/example-proxy/, '')
          },

          changeOrigin: true,
        },
      },
    },
  }
})

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
