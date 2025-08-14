import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/12/',  // 这里是你的仓库名
  plugins: [vue()],
})
