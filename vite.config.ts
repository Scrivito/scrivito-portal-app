import dns from 'dns'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// Ensure, that vite prints "localhost" instead of 127.0.0.1
// See https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        _scrivito_extensions: resolve(__dirname, '_scrivito_extensions.html'),
      },
    },
  },
  plugins: [react()],
  server: {
    port: 8080,
    strictPort: true,
  },
})
