import { marked } from 'marked'

/**
 * 应用 README 的渲染支持。
 * README 以 Markdown 源文件放在 src/data/readmes/<应用 id>.md，
 * 构建期打包进站点，运行时不依赖网络。
 */

const modules = import.meta.glob<string>('./readmes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** 取某个应用的 README 原文；没有对应文件时返回空串。 */
export function getReadmeSource(id: string): string {
  for (const path in modules) {
    const name = path.replace(/^.*\//, '').replace(/\.md$/, '')
    if (name === id) return modules[path]
  }
  return ''
}

/**
 * 把 README 里的相对路径改写成 GitHub 绝对地址。
 * README 里的截图、文档链接都是仓库内相对路径，原样渲染会 404。
 */
function rewriteRelativeUrls(html: string, repo?: string): string {
  if (!repo) return html
  const m = /github\.com\/([^/]+)\/([^/#?]+)/.exec(repo)
  if (!m) return html
  const owner = m[1]
  const name = m[2]
  const rawBase = `https://raw.githubusercontent.com/${owner}/${name}/HEAD/`
  const blobBase = `https://github.com/${owner}/${name}/blob/HEAD/`
  const norm = (p: string) => p.replace(/^\.\//, '')
  return html
    .replace(/src="(?!https?:|data:|\/\/|\/)([^"]+)"/g, (_all, p) => `src="${rawBase}${norm(p)}"`)
    .replace(/href="(?!https?:|data:|\/\/|#|mailto:)([^"]+)"/g, (_all, p) => `href="${blobBase}${norm(p)}"`)
}

/** 渲染成 HTML；repo 用于把相对图片/链接改写到 GitHub。 */
export function getReadmeHtml(id: string, repo?: string): string {
  const source = getReadmeSource(id)
  if (!source) return ''
  return rewriteRelativeUrls(marked(source) as string, repo)
}
