import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

/**
 * 备案号不写进仓库：构建时从项目根目录的 beian.json 读取。
 * 文件不存在时返回空字符串，页脚对应行自动隐藏。
 *
 * beian.json 格式：{ "icp": "<你的备案号>" }
 */
function readBeian(): string {
  try {
    const file = fileURLToPath(new URL('./beian.json', import.meta.url))
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as { icp?: unknown }
    return typeof parsed.icp === 'string' ? parsed.icp.trim() : ''
  } catch {
    return ''
  }
}

export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __ICP_BEIAN__: JSON.stringify(readBeian())
  },
  server: {
    port: 3000
  }
})
