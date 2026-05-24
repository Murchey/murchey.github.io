<script setup lang="ts">
import CardSpotlight from '@/components/inspira/CardSpotlight.vue'
import NumberTicker from '@/components/inspira/NumberTicker.vue'
import { Motion } from 'motion-v'
import {
  Code2,
  Database,
  Globe,
  Layers,
  Palette,
  Terminal,
  Cpu,
  GitBranch,
  Cloud,
} from 'lucide-vue-next'

const skills = [
  { name: 'Vue.js', icon: Code2, level: 95, category: '前端' },
  { name: 'React', icon: Layers, level: 88, category: '前端' },
  { name: 'TypeScript', icon: Terminal, level: 92, category: '语言' },
  { name: 'Node.js', icon: Cpu, level: 85, category: '后端' },
  { name: 'Tailwind CSS', icon: Palette, level: 96, category: '样式' },
  { name: 'Git', icon: GitBranch, level: 90, category: '工具' },
  { name: 'PostgreSQL', icon: Database, level: 80, category: '数据库' },
  { name: 'Docker', icon: Cloud, level: 78, category: 'DevOps' },
  { name: 'WebGL', icon: Globe, level: 72, category: '图形' },
]

const experiences = [
  {
    period: '2023 - 至今',
    role: '高级前端工程师',
    company: '科技公司',
    description: '负责核心产品的前端架构设计和开发，带领团队完成多个重要项目。',
  },
  {
    period: '2021 - 2023',
    role: '前端开发工程师',
    company: '互联网公司',
    description: '参与多个 Web 应用的开发，优化性能和用户体验。',
  },
  {
    period: '2019 - 2021',
    role: '初级开发者',
    company: '创业公司',
    description: '从零开始学习前端开发，参与公司官网和内部工具的开发。',
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
      class="mb-16 text-center"
    >
      <h1 class="text-4xl font-bold text-foreground md:text-5xl">关于我</h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        热爱技术的全栈开发者，专注于构建高质量的 Web 应用和开源项目
      </p>
    </Motion>

    <section class="mb-20">
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.1, duration: 0.5 }"
        class="grid gap-8 md:grid-cols-2"
      >
        <div class="flex flex-col justify-center gap-6">
          <h2 class="text-3xl font-bold text-foreground">个人简介</h2>
          <div class="space-y-4 text-muted-foreground">
            <p>
              我是一名热爱技术的开发者，专注于前端开发和开源项目。
              在过去的几年里，我积累了丰富的 Web 开发经验，
              熟悉 Vue.js、React、TypeScript 等现代前端技术栈。
            </p>
            <p>
              我喜欢探索新技术，分享知识，并为开源社区做出贡献。
              在我的博客中，你可以找到我的项目、技术文章和创意想法。
            </p>
            <p>
              除了编码，我还热衷于 UI/UX 设计，相信好的设计能够
              让技术变得更加美好和易用。
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <div
            class="relative h-64 w-64 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 md:h-80 md:w-80"
          >
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-8xl">👨‍💻</span>
            </div>
          </div>
        </div>
      </Motion>
    </section>

    <section class="mb-20">
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
        :viewport="{ once: true }"
      >
        <h2 class="mb-8 text-center text-3xl font-bold text-foreground">技能</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CardSpotlight
            v-for="(skill, index) in skills"
            :key="skill.name"
            class="p-4"
            gradient-color="#262626"
            :gradient-opacity="0.2"
            :gradient-size="150"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <component :is="skill.icon" class="h-5 w-5 text-foreground" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-foreground">{{ skill.name }}</span>
                  <span class="text-xs text-muted-foreground">{{ skill.category }}</span>
                </div>
                <div class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <Motion
                    as="div"
                    class="h-full rounded-full bg-foreground"
                    :initial="{ width: '0%' }"
                    :while-in-view="{ width: `${skill.level}%` }"
                    :transition="{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }"
                    :viewport="{ once: true }"
                  />
                </div>
              </div>
            </div>
          </CardSpotlight>
        </div>
      </Motion>
    </section>

    <section class="mb-20">
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
        :viewport="{ once: true }"
      >
        <h2 class="mb-8 text-center text-3xl font-bold text-foreground">工作经历</h2>
        <div class="relative space-y-8">
          <div class="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2" />
          <div
            v-for="(exp, index) in experiences"
            :key="exp.period"
            class="relative flex flex-col gap-4 md:flex-row md:items-start"
            :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >
            <div class="ml-12 md:ml-0 md:w-1/2" :class="index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'">
              <Motion
                as="div"
                :initial="{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }"
                :while-in-view="{ opacity: 1, x: 0 }"
                :transition="{ delay: index * 0.2, duration: 0.5 }"
                :viewport="{ once: true }"
              >
                <span class="text-sm text-muted-foreground">{{ exp.period }}</span>
                <h3 class="mt-1 text-lg font-semibold text-foreground">{{ exp.role }}</h3>
                <p class="text-sm text-muted-foreground">{{ exp.company }}</p>
                <p class="mt-2 text-sm text-muted-foreground">{{ exp.description }}</p>
              </Motion>
            </div>
            <div class="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-foreground bg-background md:left-1/2 md:-ml-1.5" />
          </div>
        </div>
      </Motion>
    </section>

    <section>
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
        :viewport="{ once: true }"
        class="grid grid-cols-2 gap-8 md:grid-cols-4"
      >
        <div class="text-center">
          <NumberTicker :value="5" class="text-4xl font-bold text-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">年开发经验</p>
        </div>
        <div class="text-center">
          <NumberTicker :value="12" class="text-4xl font-bold text-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">开源项目</p>
        </div>
        <div class="text-center">
          <NumberTicker :value="1200" class="text-4xl font-bold text-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">GitHub Stars</p>
        </div>
        <div class="text-center">
          <NumberTicker :value="50" class="text-4xl font-bold text-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">技术文章</p>
        </div>
      </Motion>
    </section>
  </div>
</template>