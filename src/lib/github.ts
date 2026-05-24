export interface GitHubRepo {
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Vue: '#41b883',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Python: '#3572a5',
  Go: '#00add8',
  Rust: '#dea584',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
}

export async function fetchRepoInfo(owner: string, repo: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    if (!response.ok) return null
    const data = await response.json()
    return {
      name: data.name,
      full_name: data.full_name,
      description: data.description || '',
      html_url: data.html_url,
      homepage: data.homepage,
      stargazers_count: data.stargazers_count,
      forks_count: data.forks_count,
      language: data.language,
      topics: data.topics || [],
    }
  } catch {
    return null
  }
}

export async function fetchMultipleRepos(
  repos: { owner: string; repo: string }[]
): Promise<Map<string, GitHubRepo>> {
  const results = new Map<string, GitHubRepo>()
  const promises = repos.map(async ({ owner, repo }) => {
    const data = await fetchRepoInfo(owner, repo)
    if (data) {
      results.set(repo, data)
    }
  })
  await Promise.all(promises)
  return results
}

export function getLanguageColor(language: string | null): string {
  if (!language) return '#6b7280'
  return LANGUAGE_COLORS[language] || '#6b7280'
}