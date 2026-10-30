<script setup lang="ts">
import { Github, Mail } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
/** 备案号由构建时从本地 beian.json 注入，未配置时为空字符串。 */
const icpBeian = __ICP_BEIAN__

const links = [
  { name: '项目', path: '/projects' },
  { name: '文章', path: '/articles' },
  { name: '关于', path: '/about' },
  { name: '联系', path: '/contact' },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/murchey', label: 'GitHub' },
  { icon: Mail, href: 'mailto:murchey@dingtalk.com', label: 'Email' },
]
</script>

<template>
  <footer class="border-t border-white/[0.06] bg-background/60 backdrop-blur-2xl saturate-150">
    <div class="mx-auto max-w-5xl px-4 py-12">
      <div class="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div class="text-center md:text-left">
          <router-link to="/" class="text-lg font-semibold tracking-tight text-foreground">
            Murchey
          </router-link>
          <p class="mt-1 text-sm text-muted-foreground">
            用代码构建世界，用设计诠释美好。
          </p>
        </div>

        <div class="flex items-center gap-6">
          <router-link
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ link.name }}
          </router-link>
        </div>

        <div class="flex items-center gap-3">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            :aria-label="social.label"
          >
            <component :is="social.icon" class="h-4 w-4" />
          </a>
        </div>
      </div>

      <div class="mt-8 border-t border-border/30 pt-6 text-center">
        <p class="text-xs text-muted-foreground">
          &copy; {{ currentYear }} Murchey. All rights reserved.
        </p>
        <p v-if="icpBeian" class="mt-2 text-xs text-muted-foreground">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-foreground"
          >
            {{ icpBeian }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
