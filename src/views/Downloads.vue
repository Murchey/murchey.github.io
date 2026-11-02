<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import CardSpotlight from '@/components/inspira/CardSpotlight.vue'
import BorderBeam from '@/components/inspira/BorderBeam.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Github,
  Globe,
  Cloud,
  Server,
  Download,
  ExternalLink,
  CheckCircle2,
  Calendar,
  HardDrive,
  Tag,
  Smartphone,
  Monitor,
  Copy,
  Check,
} from 'lucide-vue-next'
import { apps, resolvePackageUrl, type DownloadLink, type AppPackage } from '@/data/apps'

function linkIcon(link: DownloadLink) {
  switch (link.type) {
    case 'github':
      return Github
    case 'gitee':
      return Globe
    case 'cloud':
      return Cloud
    case 'mirror':
      return Server
    case 'official':
      return Globe
    default:
      return Download
  }
}

function platformIcon(platform: string) {
  const p = platform.toLowerCase()
  if (p.includes('android') || p.includes('ios') || p.includes('iphone')) return Smartphone
  if (p.includes('windows') || p.includes('mac') || p.includes('linux')) return Monitor
  return Download
}

function fileName(file: string) {
  return file.split('/').pop() || file
}

const copied = ref<string | null>(null)

async function copySha256(pkg: AppPackage) {
  if (!pkg.sha256) return
  try {
    await navigator.clipboard.writeText(pkg.sha256)
    copied.value = pkg.file
    setTimeout(() => {
      if (copied.value === pkg.file) copied.value = null
    }, 1500)
  } catch (e) {
    console.error('复制校验和失败:', e)
  }
}

const pageRef = ref<HTMLDivElement | null>(null)
let ctx: gsap.Context

function initAnimations() {
  if (!pageRef.value) return
  ctx?.revert()
  ctx = gsap.context(() => {
    gsap.set('.downloads-hero', { y: 20, opacity: 0 })
    gsap.to('.downloads-hero', { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })

    gsap.set('.app-card', { y: 30, opacity: 0 })
    ScrollTrigger.batch('.app-card', {
      onEnter: (batch) =>
        gsap.to(batch, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.12 }),
      start: 'top 85%',
      once: true,
    })
  }, pageRef.value)
}

onMounted(async () => {
  await nextTick()
  initAnimations()
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="pageRef" class="mx-auto max-w-5xl px-4 py-20">
    <div class="downloads-hero mb-12 text-center">
      <h1 class="text-4xl font-bold text-foreground md:text-5xl">应用下载</h1>
      <p class="mt-4 text-lg text-muted-foreground">
        我的成品应用，提供介绍与多个下载来源，欢迎体验
      </p>
    </div>

    <div class="space-y-8">
      <div v-for="(app, index) in apps" :key="app.id" class="app-card">
        <CardSpotlight
          class="border-border/40 p-6 md:p-8"
          gradient-color="#262626"
          :gradient-opacity="0.3"
        >
          <div class="flex flex-col gap-8 lg:flex-row">
            <!-- 应用介绍 -->
            <div class="flex-1">
              <div class="mb-4 flex items-start gap-4">
                <div
                  class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-muted text-3xl"
                >
                  {{ app.icon }}
                </div>
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <h2 class="text-xl font-semibold text-foreground">{{ app.name }}</h2>
                    <span
                      v-if="app.version"
                      class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {{ app.version }}
                    </span>
                  </div>
                  <p class="mt-1 text-sm text-muted-foreground">{{ app.tagline }}</p>
                </div>
              </div>

              <p class="mb-4 text-sm leading-relaxed text-muted-foreground">
                {{ app.description }}
              </p>

              <ul class="mb-4 space-y-2">
                <li
                  v-for="feature in app.features"
                  :key="feature"
                  class="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {{ feature }}
                </li>
              </ul>

              <div class="flex flex-wrap items-center gap-2">
                <span
                  v-for="platform in app.platforms"
                  :key="platform"
                  class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {{ platform }}
                </span>
                <span
                  v-for="tag in app.tags"
                  :key="tag"
                  class="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  <Tag class="h-3 w-3" />
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 下载面板 -->
            <div
              class="shrink-0 rounded-2xl border border-border/40 bg-muted/40 p-5 lg:w-80"
            >
              <h3 class="mb-1 text-sm font-semibold text-foreground">下载地址</h3>
              <p class="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span v-if="app.updatedAt" class="flex items-center gap-1">
                  <Calendar class="h-3.5 w-3.5" />
                  更新于 {{ app.updatedAt }}
                </span>
                <span v-if="app.size" class="flex items-center gap-1">
                  <HardDrive class="h-3.5 w-3.5" />
                  {{ app.size }}
                </span>
              </p>

              <!-- 服务器安装包直链 -->
              <div v-if="app.packages?.length" class="mb-4">
                <p class="mb-2 text-xs font-medium text-muted-foreground">安装包直链</p>
                <div class="space-y-2">
                  <div v-for="pkg in app.packages" :key="pkg.file">
                    <a
                      :href="resolvePackageUrl(pkg.file)"
                      download
                      class="group flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 transition-colors hover:border-primary/60 hover:bg-primary/10"
                    >
                      <component
                        :is="platformIcon(pkg.platform)"
                        class="h-4 w-4 shrink-0 text-primary"
                      />
                      <span class="min-w-0 flex-1">
                        <span class="block text-sm font-medium text-foreground">
                          {{ pkg.platform }} 安装包
                        </span>
                        <span class="block truncate text-xs text-muted-foreground">
                          {{ fileName(pkg.file) }}
                          <template v-if="pkg.size || app.size"> · {{ pkg.size || app.size }}</template>
                        </span>
                      </span>
                      <Download class="h-4 w-4 shrink-0 text-primary" />
                    </a>
                    <button
                      v-if="pkg.sha256"
                      class="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left text-xs text-muted-foreground transition-colors hover:text-foreground"
                      title="点击复制完整 SHA-256 校验和"
                      @click="copySha256(pkg)"
                    >
                      <Check v-if="copied === pkg.file" class="h-3 w-3 shrink-0 text-primary" />
                      <Copy v-else class="h-3 w-3 shrink-0" />
                      <span class="min-w-0 flex-1 truncate font-mono">
                        SHA-256: {{ pkg.sha256.slice(0, 12) }}…{{ pkg.sha256.slice(-6) }}
                      </span>
                      <span v-if="copied === pkg.file" class="shrink-0 text-primary">已复制</span>
                    </button>
                  </div>
                </div>
              </div>

              <p
                v-if="app.packages?.length"
                class="mb-2 text-xs font-medium text-muted-foreground"
              >
                其他来源
              </p>
              <div class="space-y-2">
                <a
                  v-for="link in app.links"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-3 rounded-xl border border-border/40 bg-background/60 px-4 py-3 transition-colors hover:border-primary/50 hover:bg-background"
                >
                  <component
                    :is="linkIcon(link)"
                    class="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  />
                  <span class="flex-1">
                    <span class="block text-sm font-medium text-foreground">{{ link.label }}</span>
                    <span v-if="link.hint" class="block text-xs text-muted-foreground">
                      {{ link.hint }}
                    </span>
                  </span>
                  <Download
                    class="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  />
                </a>
              </div>

              <a
                v-if="app.repo"
                :href="app.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github class="h-3.5 w-3.5" />
                查看源码
                <ExternalLink class="h-3 w-3" />
              </a>
            </div>
          </div>

          <BorderBeam :size="200" :duration="15000" :delay="index * 2000" />
        </CardSpotlight>
      </div>
    </div>

    <p class="mt-12 text-center text-sm text-muted-foreground">
      所有应用均为免费软件，下载遇到问题欢迎
      <router-link to="/contact" class="text-primary underline-offset-4 hover:underline">
        联系我
      </router-link>
      。
    </p>
  </div>
</template>
