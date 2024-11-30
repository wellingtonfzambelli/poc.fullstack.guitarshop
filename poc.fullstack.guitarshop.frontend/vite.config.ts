import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  build:{
    outDir: '../poc.fullstack.guitarshop.api/wwwroot'
  },
  server:{
    port: 3000
  },
  plugins: [react()],
})
