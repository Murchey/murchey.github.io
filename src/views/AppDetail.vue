<script setup lang="ts">
import { computed, onMounted, onUnmounted, nextTick, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import {
  ArrowLeft,
  Github,
  Globe,
  Download,
  Tag,
  Calendar,
  HardDrive,
  ExternalLink,
} from 'lucide-vue-next'
import { apps, resolvePackageUrl, type DownloadLink } from '@/data/apps'
import { getReadmeHtml } from '@/data/readmes'

const route = useRoute()

const app = computed(() => apps.find((a) => a.id === route.params.id))
const readmeHtml = computed(() =>
  app.value ? getReadmeHtml(app.value.id, app.value.repo) : ''
)

function giteeLink(links: DownloadLink[]): string | undefined {
  return links.find((l) => l.type === 'gitee')?.url
}

function githubLink(links: DownloadLink[], repo?: string): string | undefined {
  return links.find((l) => l.type === 'github')?.url || repo
}

const pageRef = ref<HTMLDivElement | null>(null)
let ctx: gsap.Context

onMounted(async () => {
  await nextTick()
  if (!pageRef.value) return
  ctx = gsap.context(() => {
    gsap.from('.detail-hero', { y: 16, opacity: 0, duration: 0.5, ease: 'power2.out' })
    gsap.from('.detail-block', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.1,
    })
  }, pageRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="pageRef" class="mx-auto max-w-4xl px-4 py-16">
    <RouterLink
      to="/downloads"
      class="detail-hero mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft class="h-4 w-4" />
      返回应用下载
    </RouterLink>

    <div v-if="!app" class="detail-hero py-20 text-center">
      <p class="text-lg text-muted-foreground">没有找到这个应用</p>
      <RouterLink
        to="/downloads"
        class="mt-4 inline-block text-primary underline-offset-4 hover:underline"
      >
        回到应用下载
      </RouterLink>
    </div>

    <template v-else>
      <!-- 应用头部 -->
      <header class="detail-hero mb-8">
        <div class="flex items-start gap-4">
          <div
            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-muted text-4xl"
          >
            {{ app.icon }}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h1 class="text-3xl font-bold text-foreground md:text-4xl">
                {{ app.name }}
              </h1>
              <span
                v-if="app.version"
                class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {{ app.version }}
              </span>
            </div>
            <p class="mt-2 text-base text-muted-foreground">{{ app.tagline }}</p>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap items-center gap-2">
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
          <span
            v-if="app.updatedAt"
            class="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            <Calendar class="h-3 w-3" />
            {{ app.updatedAt }}
          </span>
          <span
            v-if="app.size"
            class="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            <HardDrive class="h-3 w-3" />
            {{ app.size }}
          </span>
        </div>
      </header>

      <!-- 快捷入口 -->
      <div class="detail-block mb-8 flex flex-wrap gap-3">
        <a
          v-if="giteeLink(app.links)"
          :href="giteeLink(app.links)"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Globe class="h-4 w-4" />
          在 Gitee 仓库查看
          <ExternalLink class="h-3.5 w-3.5" />
        </a>
        <a
          v-if="githubLink(app.links, app.repo)"
          :href="githubLink(app.links, app.repo)"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-background"
        >
          <Github class="h-4 w-4" />
          在 GitHub 查看
          <ExternalLink class="h-3.5 w-3.5" />
        </a>
        <a
          v-for="pkg in app.packages"
          :key="pkg.file"
          :href="resolvePackageUrl(pkg.file)"
          download
          class="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-background"
        >
          <Download class="h-4 w-4" />
          {{ pkg.platform }} 安装包
        </a>
      </div>

      <!-- 简介 -->
      <p class="detail-block mb-10 text-sm leading-relaxed text-muted-foreground">
        {{ app.description }}
      </p>

      <!-- README 正文 -->
      <section class="detail-block rounded-2xl border border-border/40 bg-background/40 p-6 md:p-8">
        <h2 class="mb-6 text-lg font-semibold text-foreground">项目文档</h2>
        <div class="readme prose-readme" v-html="readmeHtml"></div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.readme {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: var(--muted-foreground, #6b7280);
  overflow-wrap: anywhere;
}
.readme :deep(h1),
.readme :deep(h2),
.readme :deep(h3),
.readme :deep(h4) {
  color: var(--foreground, #111827);
  font-weight: 650;
  line-height: 1.35;
  margin: 1.6em 0 0.7em;
}
.readme :deep(h1) {
  font-size: 1.65rem;
}
.readme :deep(h2) {
  font-size: 1.4rem;
  padding-bottom: 0.35em;
  border-bottom: 1px solid color-mix(in srgb, currentColor 12%, transparent);
}
.readme :deep(h3) {
  font-size: 1.15rem;
}
.readme :deep(h4) {
  font-size: 1rem;
}
.readme :deep(p) {
  margin: 0.85em 0;
}
.readme :deep(ul),
.readme :deep(ol) {
  margin: 0.85em 0;
  padding-left: 1.5em;
}
.readme :deep(li) {
  margin: 0.35em 0;
}
.readme :deep(a) {
  color: var(--primary, #2563eb);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.readme :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin: 1em 0;
}
.readme :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.86em;
  background: color-mix(in srgb, currentColor 9%, transparent);
  padding: 0.15em 0.4em;
  border-radius: 0.35em;
}
.readme :deep(pre) {
  background: color-mix(in srgb, currentColor 7%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 10%, transparent);
  border-radius: 0.75rem;
  padding: 0.9em 1em;
  overflow-x: auto;
  margin: 1em 0;
}
.readme :deep(pre code) {
  background: transparent;
  padding: 0;
  font-size: 0.82em;
}
.readme :deep(blockquote) {
  border-left: 3px solid color-mix(in srgb, currentColor 25%, transparent);
  padding-left: 1em;
  margin: 1em 0;
  opacity: 0.85;
}
.readme :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.2em 0;
  font-size: 0.9em;
  display: block;
  overflow-x: auto;
}
.readme :deep(th),
.readme :deep(td) {
  border: 1px solid color-mix(in srgb, currentColor 14%, transparent);
  padding: 0.55em 0.8em;
  text-align: left;
}
.readme :deep(th) {
  background: color-mix(in srgb, currentColor 6%, transparent);
  font-weight: 600;
}
.readme :deep(hr) {
  border: 0;
  border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent);
  margin: 2em 0;
}
</style>
