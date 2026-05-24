<script setup lang="ts">
import { Github, Twitter, Linkedin, Mail } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const socials = [
  { name: 'GitHub', url: 'https://github.com/murchey', icon: Github },
  // { name: 'Twitter', url: 'https://twitter.com/murchey', icon: Twitter },
  // { name: 'LinkedIn', url: 'https://linkedin.com/in/murchey', icon: Linkedin },
  { name: 'Email', url: "mailto:murchey@dingtalk.com", icon: Mail },
]
</script>

<template>
  <footer class="border-t border-border/40 bg-background">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div class="text-center md:text-left">
          <p class="text-lg font-semibold text-foreground">Murchey</p>
          <p class="mt-1 text-sm text-muted-foreground">
            &copy; {{ currentYear }} 保留所有权利
          </p>
        </div>
        <div class="flex items-center gap-4">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            :title="social.name"
          >
            <component :is="social.icon" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>