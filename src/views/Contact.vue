<script setup lang="ts">
import CardSpotlight from '@/components/inspira/CardSpotlight.vue'
import BorderBeam from '@/components/inspira/BorderBeam.vue'
import { Motion } from 'motion-v'
import { ref } from 'vue'
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle,
} from 'lucide-vue-next'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitted = ref(false)

const contacts = [
  { label: '邮箱', value: 'contact@murchey.dev', icon: Mail, href: 'mailto:contact@murchey.dev' },
  { label: 'GitHub', value: 'github.com/murchey', icon: Github, href: 'https://github.com/murchey' },
  { label: 'Twitter', value: '@murchey', icon: Twitter, href: 'https://twitter.com/murchey' },
  { label: 'LinkedIn', value: 'linkedin.com/in/murchey', icon: Linkedin, href: 'https://linkedin.com/in/murchey' },
  { label: '位置', value: '中国', icon: MapPin, href: null },
]

function handleSubmit() {
  isSubmitted.value = true
  setTimeout(() => {
    isSubmitted.value = false
    form.value = { name: '', email: '', subject: '', message: '' }
  }, 3000)
}
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
      <h1 class="text-4xl font-bold text-foreground md:text-5xl">联系我</h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        如果你有任何问题或想法，欢迎与我联系
      </p>
    </Motion>

    <div class="grid gap-12 lg:grid-cols-2">
      <Motion
        as="div"
        :initial="{ opacity: 0, x: -30 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ delay: 0.2, duration: 0.5 }"
      >
        <h2 class="mb-6 text-2xl font-bold text-foreground">联系方式</h2>
        <div class="space-y-4">
          <CardSpotlight
            v-for="contact in contacts"
            :key="contact.label"
            class="p-4"
            gradient-color="#262626"
            :gradient-opacity="0.2"
            :gradient-size="150"
          >
            <component
              :is="contact.href ? 'a' : 'div'"
              :href="contact.href || undefined"
              :target="contact.href ? '_blank' : undefined"
              :rel="contact.href ? 'noopener noreferrer' : undefined"
              class="flex items-center gap-4"
            >
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

        <div class="mt-8">
          <h3 class="mb-4 text-lg font-semibold text-foreground">工作时间</h3>
          <div class="space-y-2 text-sm text-muted-foreground">
            <p>周一至周五：9:00 - 18:00</p>
            <p>周末：不定时在线</p>
            <p class="mt-4 text-xs">通常会在 24 小时内回复邮件</p>
          </div>
        </div>
      </Motion>

      <Motion
        as="div"
        :initial="{ opacity: 0, x: 30 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ delay: 0.3, duration: 0.5 }"
      >
        <h2 class="mb-6 text-2xl font-bold text-foreground">发送消息</h2>
        <div class="relative rounded-xl border border-border/40 p-6">
          <transition
            enter-active-class="transition-all duration-300"
            enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0"
          >
            <div
              v-if="isSubmitted"
              class="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-background/95 backdrop-blur-sm"
            >
              <CheckCircle class="mb-4 h-16 w-16 text-green-500" />
              <p class="text-lg font-semibold text-foreground">消息已发送！</p>
              <p class="mt-2 text-sm text-muted-foreground">感谢你的来信，我会尽快回复。</p>
            </div>
          </transition>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">姓名</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                  placeholder="你的姓名"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-foreground">邮箱</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">主题</label>
              <input
                v-model="form.subject"
                type="text"
                required
                class="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                placeholder="消息主题"
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-foreground">消息</label>
              <textarea
                v-model="form.message"
                rows="5"
                required
                class="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                placeholder="写下你想说的话..."
              />
            </div>
            <button
              type="submit"
              class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 sm:w-auto"
            >
              <Send class="h-4 w-4" />
              发送消息
            </button>
          </form>

          <BorderBeam :size="250" :duration="15000" :delay="0" color-from="#ffaa40" color-to="#9c40ff" />
        </div>
      </Motion>
    </div>
  </div>
</template>