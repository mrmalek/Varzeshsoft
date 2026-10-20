import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import formEndpoint from './server/formEndpoint.js'

const previewMode = process.env.BASE44_PREVIEW_MODE === '1'

export default defineConfig({
  plugins: [react(), formEndpoint()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: previewMode ? true : undefined,
  },
})
