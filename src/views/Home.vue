<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import BentoGrid from '@/components/inspira/BentoGrid.vue'
import BentoGridItem from '@/components/inspira/BentoGridItem.vue'
import NumberTicker from '@/components/inspira/NumberTicker.vue'
import BorderBeam from '@/components/inspira/BorderBeam.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Palette, Zap, ArrowRight } from 'lucide-vue-next'

const features = [
  {
    icon: Code2,
    title: '开源项目',
    description: '探索我在 GitHub 上的开源项目和贡献，涵盖前端、后端和工具链。',
    href: '/projects',
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    icon: Palette,
    title: '技术文章',
    description: '分享技术见解和学习心得，记录成长的每一步。',
    href: '/articles',
    gradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    icon: Zap,
    title: '关于我',
    description: '了解我的技术栈、工作经历和个人简介。',
    href: '/about',
    gradient: 'from-orange-500/10 to-amber-500/10',
  },
]

const pageRef = ref<HTMLDivElement | null>(null)
let ctx: gsap.Context

// Scroll progress
const scrollProgress = ref(0)
function handleScroll() {
  const winH = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = winH > 0 ? window.scrollY / winH : 0
}

function initAnimations() {
  if (!pageRef.value) return
  ctx?.revert()

  ctx = gsap.context(() => {
    // Hero entrance timeline
    const heroTl = gsap.timeline({ delay: 0.3 })

    // Set initial states then animate to visible
    gsap.set('.hero-label', { y: 20, opacity: 0 })
    gsap.set('.hero-title-word', { y: 60, opacity: 0 })
    gsap.set('.hero-subtitle', { y: 20, opacity: 0 })
    gsap.set('.hero-actions', { y: 20, opacity: 0 })
    gsap.set('.hero-scroll', { y: 10, opacity: 0 })
    gsap.set('.hero-orb', { scale: 0.8, opacity: 0 })

    heroTl
      .to('.hero-orb', { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' })
      .to('.hero-label', { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.5')
      .to('.hero-title-word', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, '-=0.3')
      .to('.hero-subtitle', { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .to('.hero-actions', { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .to('.hero-scroll', { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')

    // Stats — scroll-triggered
    gsap.set('.stat-item', { y: 40, opacity: 0, scale: 0.9 })
    ScrollTrigger.batch('.stat-item', {
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7, ease: 'back.out(1.4)', stagger: 0.1,
        })
      },
      start: 'top 85%',
      once: true,
    })

    // Feature cards — scroll-triggered
    gsap.set('.feature-card', { y: 50, opacity: 0, rotateX: 12 })
    ScrollTrigger.batch('.feature-card', {
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.8, ease: 'power3.out', stagger: 0.15,
        })
      },
      start: 'top 85%',
      once: true,
    })

    // CTA
    gsap.set('.cta-section', { y: 40, opacity: 0, scale: 0.98 })
    ScrollTrigger.create({
      trigger: '.cta-section',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to('.cta-section', { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' })
      },
    })

    // Parallax on hero content
    gsap.to('.hero-parallax', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
      y: -80,
      opacity: 0,
    })
  }, pageRef.value)
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  await nextTick()
  initAnimations()
})

onUnmounted(() => {
  ctx?.revert()
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div ref="pageRef">
    <!-- Scroll progress bar -->
    <div class="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent">
      <div
        class="h-full bg-gradient-to-r from-primary/60 to-primary transition-[width] duration-100"
        :style="{ width: `${scrollProgress * 100}%` }"
      />
    </div>

    <!-- Hero Section -->
    <section class="hero-section relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4">
      <!-- Animated gradient orbs -->
      <div class="pointer-events-none absolute inset-0">
        <div class="hero-orb absolute -left-40 top-1/4 h-[700px] w-[700px] rounded-full opacity-0" style="background: radial-gradient(circle, oklch(0.65 0.25 265 / 0.25), oklch(0.6 0.2 200 / 0.08) 40%, transparent 65%); animation: orbFloat1 20s ease-in-out infinite;" />
        <div class="hero-orb absolute -right-40 top-1/3 h-[600px] w-[600px] rounded-full opacity-0" style="background: radial-gradient(circle, oklch(0.6 0.2 200 / 0.2), oklch(0.55 0.15 300 / 0.06) 40%, transparent 65%); animation: orbFloat2 25s ease-in-out infinite;" />
        <div class="hero-orb absolute bottom-1/4 left-1/3 h-[500px] w-[500px] rounded-full opacity-0" style="background: radial-gradient(circle, oklch(0.55 0.18 300 / 0.18), oklch(0.65 0.22 265 / 0.05) 40%, transparent 65%); animation: orbFloat3 18s ease-in-out infinite;" />
      </div>

      <!-- Content -->
      <div class="hero-parallax relative z-10 flex max-w-3xl flex-col items-center text-center">
        <span class="hero-label mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/40 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          欢迎来到我的个人空间
        </span>

        <h1 class="hero-title text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span class="hero-title-word inline-block bg-gradient-to-br from-foreground via-foreground/80 to-foreground/40 bg-clip-text text-transparent">
            Murchey
          </span>
        </h1>

        <p class="hero-subtitle mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          用代码构建世界，用设计诠释美好。
        </p>
        <p class="hero-subtitle mt-2 max-w-xl text-sm text-muted-foreground/60">
          全栈开发者 · 技术探索者
        </p>

        <div class="hero-actions mt-12 flex items-center gap-4">
          <router-link
            to="/projects"
            class="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-shadow hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            查看项目
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </router-link>
          <router-link
            to="/about"
            class="inline-flex items-center gap-2 rounded-full border border-border/50 px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/60"
          >
            了解更多
          </router-link>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2">
        <div class="flex flex-col items-center gap-2 text-muted-foreground/40">
          <span class="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div class="h-8 w-[1px] overflow-hidden bg-muted-foreground/20">
            <div class="h-full w-full animate-[scrollLine_2s_ease-in-out_infinite] bg-foreground/60" />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section mx-auto max-w-5xl px-4 py-28">
      <div class="grid grid-cols-2 gap-16 md:grid-cols-4">
        <div class="stat-item text-center">
          <NumberTicker :value="4" class="text-5xl font-bold tracking-tight text-foreground" />
          <p class="mt-3 text-sm text-muted-foreground/70">年开发经验</p>
        </div>
        <div class="stat-item text-center">
          <NumberTicker :value="15" class="text-5xl font-bold tracking-tight text-foreground" />
          <p class="mt-3 text-sm text-muted-foreground/70">开源项目</p>
        </div>
        <div class="stat-item text-center">
          <NumberTicker :value="12" class="text-5xl font-bold tracking-tight text-foreground" />
          <p class="mt-3 text-sm text-muted-foreground/70">年上学经验</p>
        </div>
        <div class="stat-item text-center">
          <NumberTicker :value="0" class="text-5xl font-bold tracking-tight text-foreground" />
          <p class="mt-3 text-sm text-muted-foreground/70">技术文章</p>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="mx-auto max-w-5xl px-4">
      <div class="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
    </div>

    <!-- Features -->
    <section class="features-section mx-auto max-w-5xl px-4 py-28" style="perspective: 1000px">
      <div class="mb-16 text-center">
        <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">探索更多</h2>
        <p class="mt-3 text-muted-foreground/70">发现我的技术世界</p>
      </div>
      <BentoGrid>
        <BentoGridItem
          v-for="(feature, index) in features"
          :key="feature.title"
          class="feature-card group"
          :class="index === 0 ? 'md:col-span-2' : ''"
          style="transform-style: preserve-3d"
        >
          <template #header>
            <router-link :to="feature.href" class="block overflow-hidden rounded-xl">
              <div
                class="flex h-40 w-full items-center justify-center bg-gradient-to-br transition-transform duration-500 group-hover:scale-105"
                :class="feature.gradient"
              >
                <component :is="feature.icon" class="h-14 w-14 text-muted-foreground/30 transition-transform duration-500 group-hover:scale-110" />
              </div>
            </router-link>
          </template>
          <template #title>
            <router-link :to="feature.href" class="transition-colors hover:text-primary">
              {{ feature.title }}
            </router-link>
          </template>
          <template #description>
            <span class="text-sm leading-relaxed text-muted-foreground/80">{{ feature.description }}</span>
          </template>
        </BentoGridItem>
      </BentoGrid>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-5xl px-4 pb-28">
      <div class="cta-section relative overflow-hidden rounded-3xl border border-white/[0.08] bg-card/40 p-20 text-center backdrop-blur-xl saturate-150">
        <!-- Top highlight edge -->
        <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
        <BorderBeam :size="350" :duration="12000" :delay="0" color-from="oklch(0.65 0.18 265)" color-to="oklch(0.6 0.15 200)" />
        <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">开始探索</h2>
        <p class="mx-auto mt-5 max-w-md text-muted-foreground/70">
          浏览我的项目，了解我的技术栈，或者直接与我联系。
        </p>
        <div class="mt-10 flex items-center justify-center gap-4">
          <router-link
            to="/projects"
            class="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            浏览项目
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </router-link>
          <router-link
            to="/contact"
            class="inline-flex items-center gap-2 rounded-full border border-border/50 px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/60"
          >
            联系我
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes orbFloat1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -40px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}
@keyframes orbFloat2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, 30px) scale(1.05); }
  66% { transform: translate(25px, -25px) scale(1.1); }
}
@keyframes orbFloat3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, 30px) scale(1.08); }
  66% { transform: translate(-30px, -20px) scale(0.95); }
}

@keyframes scrollLine {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
}
</style>
