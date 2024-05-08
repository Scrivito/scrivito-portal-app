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

  const enablePisa = env.ENABLE_PISA === 'true'

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
      'import.meta.env.ENABLE_PISA': JSON.stringify(enablePisa),
    },
    optimizeDeps: {
      include: ['scrivito'],
      force: true,
    },
    plugins: [react(), writeProductionHeaders(outDir)],
    preview: {
      port: 8080,
      strictPort: true,
    },
    resolve: {
      alias: {
        // ensure that a shared React instance is used
        // this is necessary, if package.json references scrivito via "file:"
        // compare:
        // https://medium.com/@penx/managing-dependencies-in-a-node-package-so-that-they-are-compatible-with-npm-link-61befa5aaca7
        react: resolve(__dirname, './node_modules/react'),
        'react-dom': resolve(__dirname, './node_modules/react-dom'),
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
