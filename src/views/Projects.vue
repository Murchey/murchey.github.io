<script setup lang="ts">
import CardSpotlight from '@/components/inspira/CardSpotlight.vue'
import BorderBeam from '@/components/inspira/BorderBeam.vue'
import { Motion } from 'motion-v'
import { ExternalLink, Github, Star, GitFork } from 'lucide-vue-next'

const projects = [
  {
    name: 'Vue Component Library',
    description: '一个基于 Vue 3 的现代组件库，提供丰富的 UI 组件和工具函数，帮助开发者快速构建高质量的 Web 应用。',
    tags: ['Vue 3', 'TypeScript', '组件库'],
    github: 'https://github.com/murchey/vue-components',
    demo: 'https://vue-components.murchey.dev',
    stars: 320,
    forks: 45,
    language: 'TypeScript',
    languageColor: '#3178c6',
  },
  {
    name: 'Blog System',
    description: '使用 Vue 3 和 Inspira UI 构建的个人博客系统，支持 Markdown 渲染、代码高亮和响应式设计。',
    tags: ['Vue 3', 'Inspira UI', 'Tailwind CSS'],
    github: 'https://github.com/murchey/blog',
    demo: 'https://blog.murchey.dev',
    stars: 180,
    forks: 28,
    language: 'Vue',
    languageColor: '#41b883',
  },
  {
    name: 'Node.js API Framework',
    description: '一个轻量级的 Node.js RESTful API 框架，内置中间件系统、路由管理和错误处理。',
    tags: ['Node.js', 'Express', 'REST API'],
    github: 'https://github.com/murchey/node-api',
    demo: null,
    stars: 256,
    forks: 32,
    language: 'JavaScript',
    languageColor: '#f7df1e',
  },
  {
    name: 'CSS Animation Library',
    description: '一个轻量级的 CSS 动画库，提供 50+ 预设动画效果，支持自定义配置和链式调用。',
    tags: ['CSS', 'Animation', 'Library'],
    github: 'https://github.com/murchey/css-animations',
    demo: 'https://css-animations.murchey.dev',
    stars: 412,
    forks: 58,
    language: 'CSS',
    languageColor: '#563d7c',
  },
  {
    name: 'React Dashboard',
    description: '基于 React 和 Recharts 的数据可视化仪表板，支持多种图表类型和实时数据更新。',
    tags: ['React', 'TypeScript', 'Recharts'],
    github: 'https://github.com/murchey/react-dashboard',
    demo: 'https://dashboard.murchey.dev',
    stars: 198,
    forks: 24,
    language: 'TypeScript',
    languageColor: '#3178c6',
  },
  {
    name: 'CLI Tool',
    description: '一个命令行工具，用于快速生成项目模板和脚手架，支持多种框架和语言。',
    tags: ['CLI', 'Node.js', 'Tool'],
    github: 'https://github.com/murchey/cli-tool',
    demo: null,
    stars: 89,
    forks: 12,
    language: 'Go',
    languageColor: '#00add8',
  },
]
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
                  :style="{ backgroundColor: project.languageColor }"
                />
                <span class="text-xs text-muted-foreground">{{ project.language }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star class="h-3.5 w-3.5" />
                  {{ project.stars }}
                </span>
                <span class="flex items-center gap-1 text-xs text-muted-foreground">
                  <GitFork class="h-3.5 w-3.5" />
                  {{ project.forks }}
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