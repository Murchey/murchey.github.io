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
 * 生成与 GitHub 一致的标题锚点。
 * README 里的目录链接（如 [功能特性](#功能特性)）沿用 GitHub 的 slug 规则：
 * 转小写、去掉标点（保留中文/字母/数字/下划线/连字符）、每个空格转成一个连字符。
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/ /g, '-')
}

/** 还原 HTML 实体，得到可比对的纯文本。 */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

/**
 * 给标题注入 GitHub 兼容的 id，让 README 里的页内目录链接能跳转。
 * 直接后处理 HTML，避开 marked 各版本渲染器 API 的差异。
 */
function addHeadingIds(html: string): string {
  const seen = new Map<string, number>()
  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_all, depth, inner) => {
    const label = decodeEntities(inner.replace(/<[^>]+>/g, ''))
    let slug = slugify(label)
    if (!slug) return `<h${depth}>${inner}</h${depth}>`
    const count = seen.get(slug) ?? 0
    seen.set(slug, count + 1)
    if (count > 0) slug = `${slug}-${count}`
    return `<h${depth} id="${slug}">${inner}</h${depth}>`
  })
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
  const html = marked(source) as string
  return rewriteRelativeUrls(addHeadingIds(html), repo)
}
