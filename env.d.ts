/// <reference types="vite/client" />

/** 构建时由 vite.config.ts 从本地 beian.json 注入的备案号，未配置为空字符串。 */
declare const __ICP_BEIAN__: string

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}