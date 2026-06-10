<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import CardSpotlight from '@/components/inspira/CardSpotlight.vue'
import NumberTicker from '@/components/inspira/NumberTicker.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Database, Terminal, Cpu, GitBranch } from 'lucide-vue-next'

const skills = [
  { name: 'Vue.js', icon: Code2, level: 60, category: '前端' },
  { name: 'TypeScript', icon: Terminal, level: 60, category: '语言' },
  { name: 'Node.js', icon: Cpu, level: 60, category: '后端' },
  { name: 'Git', icon: GitBranch, level: 90, category: '工具' },
  { name: 'Java', icon: Terminal, level: 60, category: '语言' },
  { name: 'Python', icon: Terminal, level: 70, category: '语言' },
  { name: 'MySQL', icon: Database, level: 0, category: '数据库' },
]

const experiences = [
  { period: '2025 - 至今 ', role: '某省理工大学学生', company: '某城市理工大学', description: '学习高阶学科知识。' },
  { period: '2022 - 2025', role: '某城市高级中学普通学生', company: '某城市高级中学', description: '负责试卷题目的答案编写和审核，确保题目符合试卷题目要求。' },
  { period: '2019 - 2022', role: '某城市初级中学学生', company: '某城市初级中学', description: '基础学科学习与自然语言学习。' },
]

const pageRef = ref<HTMLDivElement | null>(null)
let ctx: gsap.Context

onMounted(async () => {
  await nextTick()
  if (!pageRef.value) return

  ctx = gsap.context(() => {
    // Set initial states
    gsap.set('.about-hero', { y: 20, opacity: 0 })
    gsap.set('.about-bio', { y: 30, opacity: 0 })
    gsap.set('.skill-card', { y: 30, opacity: 0 })
    gsap.set('.timeline-item', { opacity: 0 })
    gsap.set('.about-stat', { y: 30, opacity: 0 })

    // Skill bars — store target width, then set to 0, then animate
    const bars = document.querySelectorAll<HTMLElement>('.skill-bar-fill')
    const targetWidths = Array.from(bars).map((el) => el.style.width || '0%')
    bars.forEach((el) => { el.style.width = '0%' })

    // Hero entrance
    gsap.to('.about-hero', { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
    gsap.to('.about-bio', { y: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: 'power2.out' })

    // Skills — scroll-triggered
    ScrollTrigger.batch('.skill-card', {
      onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 }),
      start: 'top 85%', once: true,
    })
    bars.forEach((bar, i) => {
      ScrollTrigger.create({
        trigger: bar,
        start: 'top 85%',
        once: true,
        onEnter: () => gsap.to(bar, { width: targetWidths[i], duration: 0.8, ease: 'power2.out' }),
      })
    })

    // Timeline items
    document.querySelectorAll('.timeline-item').forEach((el, i) => {
      gsap.set(el, { x: i % 2 === 0 ? -30 : 30, opacity: 0 })
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => gsap.to(el, { x: 0, opacity: 1, duration: 0.5, delay: i * 0.15, ease: 'power2.out' }),
      })
    })

    // Stats
    ScrollTrigger.batch('.about-stat', {
      onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12 }),
      start: 'top 85%', once: true,
    })
  }, pageRef.value)
})

onUnmounted(() => { ctx?.revert() })
</script>

<template>
  <div ref="pageRef" class="mx-auto max-w-5xl px-4 py-20">
    <div class="about-hero mb-20 text-center">
      <h1 class="text-4xl font-bold tracking-tight text-foreground md:text-5xl">关于我</h1>
      <p class="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
        热爱技术的全栈开发者，专注于学习构建 Web 应用和 AI 辅助项目
      </p>
    </div>

    <section class="mb-24">
      <div class="about-bio grid gap-12 md:grid-cols-5">
        <div class="flex flex-col justify-center gap-6 md:col-span-3">
          <h2 class="text-2xl font-bold tracking-tight text-foreground">个人简介</h2>
          <div class="space-y-4 leading-relaxed text-muted-foreground">
            <p>我是一名热爱技术的全栈开发者，专注于学习构建 Web 应用和 AI 辅助项目。还在学习 Vue.js、React、TypeScript 等现代前端技术栈以及 Java、Python 等后端技术栈。</p>
          </div>
        </div>
        <div class="flex items-center justify-center md:col-span-2">
          <div class="relative h-56 w-56 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 md:h-72 md:w-72">
            <div class="absolute inset-0 flex items-center justify-center"><span class="text-7xl">😎</span></div>
          </div>
        </div>
      </div>
    </section>

    <div class="mb-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <section class="skills-section mb-24">
      <h2 class="mb-10 text-center text-2xl font-bold tracking-tight text-foreground">技能</h2>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CardSpotlight v-for="skill in skills" :key="skill.name" class="skill-card p-4" gradient-color="#262626" :gradient-opacity="0.15" :gradient-size="150">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
              <component :is="skill.icon" class="h-4 w-4 text-muted-foreground" />
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-foreground">{{ skill.name }}</span>
                <span class="text-xs text-muted-foreground">{{ skill.category }}</span>
              </div>
              <div class="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div class="skill-bar-fill h-full rounded-full bg-foreground/70" :style="{ width: `${skill.level}%` }" />
              </div>
            </div>
          </div>
        </CardSpotlight>
      </div>
    </section>

    <section class="timeline-section mb-24">
      <h2 class="mb-10 text-center text-2xl font-bold tracking-tight text-foreground">经历</h2>
      <div class="relative space-y-8">
        <div class="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
        <div v-for="(exp, index) in experiences" :key="exp.period" class="timeline-item relative flex flex-col gap-4 md:flex-row md:items-start" :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
          <div class="ml-12 md:ml-0 md:w-1/2" :class="index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'">
            <span class="text-xs text-muted-foreground">{{ exp.period }}</span>
            <h3 class="mt-1 text-base font-semibold text-foreground">{{ exp.role }}</h3>
            <p class="text-sm text-muted-foreground">{{ exp.company }}</p>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ exp.description }}</p>
          </div>
          <div class="absolute left-2.5 top-1 h-2.5 w-2.5 rounded-full border-2 border-foreground bg-background md:left-1/2 md:-ml-[5px]" />
        </div>
      </div>
    </section>

    <div class="mb-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    <section class="about-stats grid grid-cols-2 gap-12 md:grid-cols-4">
      <div class="about-stat text-center">
        <NumberTicker :value="4" class="text-4xl font-bold tracking-tight text-foreground" />
        <p class="mt-2 text-sm text-muted-foreground">年开发经验</p>
      </div>
      <div class="about-stat text-center">
        <NumberTicker :value="15" class="text-4xl font-bold tracking-tight text-foreground" />
        <p class="mt-2 text-sm text-muted-foreground">开源项目</p>
      </div>
      <div class="about-stat text-center">
        <NumberTicker :value="12" class="text-4xl font-bold tracking-tight text-foreground" />
        <p class="mt-2 text-sm text-muted-foreground">年上学经验</p>
      </div>
      <div class="about-stat text-center">
        <NumberTicker :value="0" class="text-4xl font-bold tracking-tight text-foreground" />
        <p class="mt-2 text-sm text-muted-foreground">技术文章</p>
      </div>
    </section>
  </div>
</template>
