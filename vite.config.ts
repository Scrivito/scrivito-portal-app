import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'dns'

// Ensure, that vite prints "localhost" instead of 127.0.0.1
// See https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    strictPort: true,
  },
})
