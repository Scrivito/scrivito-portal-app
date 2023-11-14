import dns from 'dns'
import fs from 'fs'
import cspBuilder from 'content-security-policy-builder'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import headersCsp from './src/_headersCsp.json'

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
    plugins: [react(), writeProductionHeaders(outDir)],
    preview: {
      port: 8080,
      strictPort: true,
    },
    server: {
      port: 8080,
      strictPort: true,
      headers: {
        'Content-Security-Policy': devServerCspHeader(),
      },
      proxy: {
        '/jr-api': {
          target: 'https://api.justrelate.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/jr-api/, ''),
          headers: { 'X-JR-API-Location': 'http://localhost:8080/jr-api' },
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
      const unprocessedHeaders = await fs.promises.readFile(
        resolve(__dirname, 'src', '_headers'),
        'utf-8',
      )

      const headers = unprocessedHeaders.replace(
        /CSP-DIRECTIVES-PLACEHOLDER/g,
        cspBuilder({ directives: headersCsp }),
      )

      await fs.promises.writeFile(
        resolve(__dirname, outDir, '_headers'),
        headers,
      )
    },
  }
}

function devServerCspHeader() {
  const directives = JSON.parse(JSON.stringify(headersCsp))

  // This snipped is included by `@vitejs/plugin-react-swc` (see [1]).
  // See [2] how to generate a sha256 hash.
  //
  // [1] https://github.com/vitejs/vite-plugin-react-swc/blob/17bb3ab6f0223f2c19d5cb3b9097457418188da5/src/index.ts#L17C7-L20
  // [2] https://content-security-policy.com/hash/
  directives['script-src'].push(
    "'sha256-Z2/iFzh9VMlVkEOar1f/oSHWwQk3ve1qk/C2WdsC4Xk='",
  )

  return cspBuilder({ directives })
}
