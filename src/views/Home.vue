<script setup lang="ts">
import AuroraBackground from '@/components/inspira/AuroraBackground.vue'
import LetterPullup from '@/components/inspira/LetterPullup.vue'
import CardSpotlight from '@/components/inspira/LetterPullup.vue'
import BentoGrid from '@/components/inspira/BentoGrid.vue'
import BentoGridItem from '@/components/inspira/BentoGridItem.vue'
import NumberTicker from '@/components/inspira/NumberTicker.vue'
import BorderBeam from '@/components/inspira/BorderBeam.vue'
import { Motion } from 'motion-v'
import { Code2, Palette, Zap, ArrowRight } from 'lucide-vue-next'

const features = [
  {
    icon: Code2,
    title: '开源项目',
    description: '探索我在 GitHub 上的开源项目和贡献，涵盖前端、后端和工具链。',
    href: '/projects',
  },
  {
    icon: Palette,
    title: '创意设计',
    description: '展示我的设计作品和创意想法，将美学与功能完美结合。',
    href: '/about',
  },
  {
    icon: Zap,
    title: '技术分享',
    description: '分享我的技术见解和学习心得，记录成长的每一步。',
    href: '/contact',
  },
]

const stats = [
  { label: '年开发经验', value: 4 },
  { label: '开源项目', value: 15 },
  { label: '年上学经验', value: 12 },
  { label: '技术文章', value: 0 },
]
</script>

<template>
  <div>
    <AuroraBackground>
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
        :while-in-view="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }"
        class="relative flex flex-col items-center justify-center gap-6 px-4"
      >
        <div
          class="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-sm text-foreground/60 backdrop-blur-sm"
        >
          欢迎来到我的个人空间
        </div>

        <LetterPullup
          words="Murchey's Blog"
          :delay="0.05"
          class="text-4xl font-bold text-foreground md:text-7xl"
        />

        <p class="max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
          这里是我的个人空间，展示我的项目、想法和创作。<br />
          用代码构建世界，用设计诠释美好。
        </p>

        <div class="mt-4 flex items-center gap-4">
          <router-link
            to="/projects"
            class="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:scale-105 hover:shadow-lg"
          >
            查看项目
            <ArrowRight class="h-4 w-4" />
          </router-link>
          <router-link
            to="/about"
            class="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-foreground/10"
          >
            了解更多
          </router-link>
        </div>
      </Motion>
    </AuroraBackground>

    <section class="mx-auto max-w-6xl px-4 py-20">
      <div class="mb-12 text-center">
        <h2 class="text-3xl font-bold text-foreground md:text-4xl">数据概览</h2>
        <p class="mt-2 text-muted-foreground">用数字记录成长</p>
      </div>
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
        :viewport="{ once: true }"
        class="grid grid-cols-2 gap-8 md:grid-cols-4"
      >
        <div class="text-center">
          <NumberTicker :value="4" class="text-4xl font-bold text-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">年开发经验</p>
        </div>
        <div class="text-center">
          <NumberTicker :value="15" class="text-4xl font-bold text-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">开源项目</p>
        </div>
        <div class="text-center">
          <NumberTicker :value="12" class="text-4xl font-bold text-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">年上学经验</p>
        </div>
        <div class="text-center">
          <NumberTicker :value="0" class="text-4xl font-bold text-foreground" />
          <p class="mt-2 text-sm text-muted-foreground">技术文章</p>
        </div>
      </Motion>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-20">
      <div class="mb-12 text-center">
        <h2 class="text-3xl font-bold text-foreground md:text-4xl">探索更多</h2>
        <p class="mt-2 text-muted-foreground">发现我的世界</p>
      </div>
      <BentoGrid>
        <BentoGridItem
          v-for="(feature, index) in features"
          :key="feature.title"
          :class="index === 0 ? 'md:col-span-2' : ''"
        >
          <template #header>
            <div
              class="flex h-32 w-full items-center justify-center rounded-md bg-gradient-to-br from-muted to-muted/50"
            >
              <component
                :is="feature.icon"
                class="h-12 w-12 text-muted-foreground/50"
              />
            </div>
          </template>
          <template #title>
            <span>{{ feature.title }}</span>
          </template>
          <template #description>
            <span class="text-sm">{{ feature.description }}</span>
          </template>
        </BentoGridItem>
      </BentoGrid>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-20">
      <div
        class="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-muted/50 to-muted/20 p-12 text-center"
      >
        <BorderBeam :size="250" :duration="12000" :delay="0" color-from="#ffaa40" color-to="#9c40ff" />
        <h2 class="text-3xl font-bold text-foreground md:text-4xl">开始探索</h2>
        <p class="mx-auto mt-4 max-w-lg text-muted-foreground">
          浏览我的项目，了解我的技术栈，或者直接与我联系。
        </p>
        <div class="mt-8 flex items-center justify-center gap-4">
          <router-link
            to="/projects"
            class="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:scale-105"
          >
            浏览项目
            <ArrowRight class="h-4 w-4" />
          </router-link>
          <router-link
            to="/contact"
            class="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground/5"
          >
            联系我
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>