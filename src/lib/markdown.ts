import { marked } from 'marked'

export interface ArticleMeta {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  readTime: string
}

export interface Article extends ArticleMeta {
  content: string
  html: string
}

const markdownModules = import.meta.glob<string>('/src/data/*.md', {
  query: '?raw',
  import: 'default',
})

const metadataModules = import.meta.glob<{ default: Partial<ArticleMeta> }>(
  '/src/data/*.meta.ts',
  { eager: true }
)

function parseFrontmatter(content: string): {
  meta: Partial<ArticleMeta>
  body: string
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { meta: {}, body: content }
  }

  const frontmatter = match[1]
  const body = match[2]
  const meta: Partial<ArticleMeta> = {}

  frontmatter.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')

    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      const trimmedKey = key.trim()

      if (trimmedKey === 'tags') {
        meta.tags = value.split(',').map((t) => t.trim())
      } else if (
        trimmedKey === 'title' ||
        trimmedKey === 'description' ||
        trimmedKey === 'date' ||
        trimmedKey === 'readTime'
      ) {
        ;(meta as Record<string, string>)[trimmedKey] = value
      }
    }
  })

  return { meta, body }
}

function generateId(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/^.*\//, '')
}

export async function loadArticles(): Promise<Article[]> {
  const articles: Article[] = []

  for (const path in markdownModules) {
    const id = generateId(path)
    const content = await markdownModules[path]()
    const { meta, body } = parseFrontmatter(content)

    const metaPath = path.replace('.md', '.meta.ts')

    if (metadataModules[metaPath]) {
      Object.assign(meta, metadataModules[metaPath].default)
    }

    const title = meta.title || id

    const description =
      meta.description ||
      body.substring(0, 150).replace(/[#*`\[\]]/g, '') + '...'

    const date =
      meta.date || new Date().toISOString().split('T')[0]

    const tags = meta.tags || []

    const readTime =
      meta.readTime ||
      `${Math.ceil(body.split(/\s+/).length / 200)} 分钟`

    articles.push({
      id,
      title,
      description,
      date,
      tags,
      readTime,
      content: body,
      html: marked(body) as string,
    })
  }

  articles.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return articles
}

let articlesCache: Article[] | null = null

export async function getArticles(): Promise<Article[]> {
  if (!articlesCache) {
    articlesCache = await loadArticles()
  }

  return articlesCache
}

export async function getArticleById(
  id: string
): Promise<Article | undefined> {
  const articles = await getArticles()

  return articles.find((a) => a.id === id)
}
