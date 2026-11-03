import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

/**
 * 备案号不写进仓库：构建时从项目根目录的 beian.json 读取。
 * 文件不存在或字段为空时返回空字符串，页脚对应项自动隐藏。
 *
 * beian.json 格式：
 *   { "icp": "<ICP 备案号>", "police": "<公安备案号>" }
 */
function readBeianField(key: 'icp' | 'police'): string {
  try {
    const file = fileURLToPath(new URL('./beian.json', import.meta.url))
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>
    return typeof parsed[key] === 'string' ? (parsed[key] as string).trim() : ''
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
    __ICP_BEIAN__: JSON.stringify(readBeianField('icp')),
    __ICP_POLICE__: JSON.stringify(readBeianField('police'))
  },
  server: {
    port: 3000
  }
})
