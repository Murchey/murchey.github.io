<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import CardSpotlight from '@/components/inspira/CardSpotlight.vue'
import { gsap } from 'gsap'
import { Mail, Github, MapPin } from 'lucide-vue-next'

const contacts = [
  { label: '邮箱', value: 'murchey@dingtalk.com', icon: Mail, href: null },
  { label: 'GitHub', value: 'github.com/murchey', icon: Github, href: 'https://github.com/murchey' },
  { label: '位置', value: '中国', icon: MapPin, href: null },
]

const pageRef = ref<HTMLDivElement | null>(null)
let ctx: gsap.Context

onMounted(async () => {
  await nextTick()
  if (!pageRef.value) return
  ctx = gsap.context(() => {
    gsap.set('.contact-hero', { y: 20, opacity: 0 })
    gsap.to('.contact-hero', { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })

    gsap.set('.contact-info', { x: -30, opacity: 0 })
    gsap.to('.contact-info', { x: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power2.out' })

    gsap.set('.contact-card', { y: 20, opacity: 0 })
    gsap.to('.contact-card', { y: 0, opacity: 1, duration: 0.4, delay: 0.3, ease: 'power2.out', stagger: 0.1 })
  }, pageRef.value)
})

onUnmounted(() => { ctx?.revert() })
</script>

<template>
  <div ref="pageRef" class="mx-auto max-w-5xl px-4 py-20">
    <div class="contact-hero mb-16 text-center">
      <h1 class="text-4xl font-bold text-foreground md:text-5xl">联系我</h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">如果你有任何问题或想法，欢迎与我联系</p>
    </div>

    <div class="grid gap-12 lg:grid-cols-2">
      <div class="contact-info">
        <h2 class="mb-6 text-2xl font-bold text-foreground">联系方式</h2>
        <div class="space-y-4">
          <CardSpotlight v-for="contact in contacts" :key="contact.label" class="contact-card p-4" gradient-color="#262626" :gradient-opacity="0.2" :gradient-size="150">
            <component :is="contact.href ? 'a' : 'div'" :href="contact.href || undefined" :target="contact.href ? '_blank' : undefined" :rel="contact.href ? 'noopener noreferrer' : undefined" class="flex items-center gap-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <component :is="contact.icon" class="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">{{ contact.label }}</p>
                <p class="font-medium text-foreground">{{ contact.value }}</p>
              </div>
            </component>
          </CardSpotlight>
        </div>
      </div>
    </div>
  </div>
</template>
