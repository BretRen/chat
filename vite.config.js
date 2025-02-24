import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';



// 获取当前文件夹路径
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// https://vite.dev/config/
export default defineConfig({
  base: '/chat/',
  plugins: [
    react(),
    
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
})
