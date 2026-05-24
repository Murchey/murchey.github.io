<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CardSpotlight from '@/components/inspira/CardSpotlight.vue'
import BorderBeam from '@/components/inspira/BorderBeam.vue'
import { Motion } from 'motion-v'
import { ExternalLink, Github, Star, GitFork, Loader2 } from 'lucide-vue-next'
import { fetchMultipleRepos, getLanguageColor, type GitHubRepo } from '@/lib/github'

interface Project {
  name: string
  repo: string
  owner: string
  description: string
  tags: string[]
  github: string
  demo: string | null
  language: string | null
  stars: number
  forks: number
}

const projects = ref<Project[]>([
  {
    name: '墨麒麟记账',
    repo: 'inkqilin-ledger',
    owner: 'murchey',
    description: '一个基于 JetPack Components 的安卓记账APP，提供便捷快速的记账和统计功能。',
    tags: ['Kotlin', 'Android', 'JetPack Components'],
    github: 'https://github.com/murchey/inkqilin-ledger',
    demo: null,
    language: 'Kotlin',
    stars: 0,
    forks: 0,
  },
  {
    name: '文途智行（Web端）',
    repo: 'hpu-guider-agent',
    owner: 'murchey',
    description: '使用 Vue 3 和 ElementPlus 构建的导游智能体前端页面。',
    tags: ['Vue 3', 'ElementPlus', 'TypeScript'],
    github: 'https://github.com/Murchey/hpu-guider-agent',
    demo: null,
    language: 'Vue',
    stars: 0,
    forks: 0,
  },
  {
    name: '文途智行（移动端）',
    repo: 'hpu-guider-agent-mobile',
    owner: 'murchey',
    description: '一个导游智能体移动端应用。',
    tags: ['Vue 3'],
    github: 'https://github.com/Murchey/hpu-guider-agent-mobile',
    demo: null,
    language: 'Vue',
    stars: 0,
    forks: 0,
  },
  {
    name: '仿原神抽卡姓名抽取器',
    repo: 'genshin-name-drawer',
    owner: 'murchey',
    description: '一个仿原神抽卡姓名抽取器，用于从姓名文档中随机提取姓名，符合课堂使用习惯。',
    tags: ['C#', 'Windows Forms', 'Windows API'],
    github: 'https://github.com/Murchey/genshin-name-drawer',
    demo: null,
    language: 'C#',
    stars: 0,
    forks: 0,
  },
  {
    name: '账单对比程序',
    repo: 'Billing_Discrepancy_Comparison',
    owner: 'murchey',
    description: '一个账单对比程序，用于大量账单的差异报告生成。',
    tags: ['Java', 'Python', 'Spring', 'Swing'],
    github: 'https://github.com/Murchey/Billing_Discrepancy_Comparison',
    demo: null,
    language: 'Java',
    stars: 0,
    forks: 0,
  },
])

const loading = ref(true)
const error = ref<string | null>(null)

async function loadGitHubData() {
  loading.value = true
  error.value = null

  try {
    const reposToFetch = projects.value.map((p) => ({
      owner: p.owner,
      repo: p.repo,
    }))

    const repoData = await fetchMultipleRepos(reposToFetch)

    projects.value = projects.value.map((project) => {
      const data = repoData.get(project.repo)
      if (data) {
        return {
          ...project,
          stars: data.stargazers_count,
          forks: data.forks_count,
          description: data.description || project.description,
          language: data.language || project.language,
        }
      }
      return project
    })
  } catch (e) {
    error.value = '加载 GitHub 数据失败'
    console.error('Failed to load GitHub data:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadGitHubData()
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-20">
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
      class="mb-12 text-center"
    >
      <h1 class="text-4xl font-bold text-foreground md:text-5xl">我的项目</h1>
      <p class="mt-4 text-lg text-muted-foreground">
        这里是我在 GitHub 上的开源项目集合
      </p>
      <div v-if="loading" class="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 class="h-4 w-4 animate-spin" />
        正在加载 GitHub 数据...
      </div>
      <div v-if="error" class="mt-4 text-sm text-destructive">
        {{ error }}
        <button
          class="ml-2 underline hover:text-destructive/80"
          @click="loadGitHubData"
        >
          重试
        </button>
      </div>
    </Motion>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="(project, index) in projects"
        :key="project.name"
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: index * 0.1, duration: 0.5 }"
      >
        <CardSpotlight
          class="h-full border-border/40 p-6"
          gradient-color="#262626"
          :gradient-opacity="0.3"
        >
          <div class="flex h-full flex-col">
            <div class="mb-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div
                  class="h-3 w-3 rounded-full"
                  :style="{ backgroundColor: getLanguageColor(project.language) }"
                />
                <span class="text-xs text-muted-foreground">{{ project.language }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star class="h-3.5 w-3.5" />
                  <span v-if="loading" class="inline-block h-3 w-8 animate-pulse rounded bg-muted" />
                  <span v-else>{{ project.stars }}</span>
                </span>
                <span class="flex items-center gap-1 text-xs text-muted-foreground">
                  <GitFork class="h-3.5 w-3.5" />
                  <span v-if="loading" class="inline-block h-3 w-8 animate-pulse rounded bg-muted" />
                  <span v-else>{{ project.forks }}</span>
                </span>
              </div>
            </div>

            <h3 class="mb-2 text-lg font-semibold text-foreground">
              {{ project.name }}
            </h3>

            <p class="mb-4 flex-1 text-sm text-muted-foreground">
              {{ project.description }}
            </p>

            <div class="mb-4 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center gap-3 border-t border-border/40 pt-4">
              <a
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github class="h-4 w-4" />
                代码
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink class="h-4 w-4" />
                演示
              </a>
            </div>
          </div>

          <BorderBeam :size="200" :duration="15000" :delay="index * 2000" />
        </CardSpotlight>
      </Motion>
    </div>
  </div>
</template>