<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { Moon, Sun, Menu, X, Github } from 'lucide-vue-next'

const route = useRoute()
const mobileMenuOpen = ref(false)
const isDark = ref(false)
const navRef = ref<HTMLElement | null>(null)
const indicatorRef = ref<HTMLSpanElement | null>(null)

const navItems = [
  { name: '首页', path: '/' },
  { name: '项目', path: '/projects' },
  { name: '文章', path: '/articles' },
  { name: '关于', path: '/about' },
  { name: '联系', path: '/contact' },
]

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function animateIndicator() {
  if (!navRef.value || !indicatorRef.value) return
  const activeLink = navRef.value.querySelector(`[data-path="${route.path}"]`) as HTMLElement
  if (!activeLink) {
    gsap.to(indicatorRef.value, { autoAlpha: 0, duration: 0.2 })
    return
  }
  const navRect = navRef.value.getBoundingClientRect()
  const linkRect = activeLink.getBoundingClientRect()
  gsap.to(indicatorRef.value, {
    x: linkRect.left - navRect.left,
    width: linkRect.width,
    autoAlpha: 1,
    duration: 0.3,
    ease: 'power2.out',
  })
}

let lastScrollY = 0
const navbarHidden = ref(false)

function handleScroll() {
  const currentY = window.scrollY
  navbarHidden.value = currentY > 80 && currentY > lastScrollY
  lastScrollY = currentY
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  nextTick(animateIndicator)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => route.path, () => nextTick(animateIndicator))
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-background/60 backdrop-blur-2xl saturate-150 transition-transform duration-300"
    :class="{ '-translate-y-full': navbarHidden }"
  >
    <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
      <router-link
        to="/"
        class="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
      >
        Murchey
      </router-link>

      <div ref="navRef" class="relative hidden items-center gap-0.5 md:flex">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :data-path="item.path"
          class="relative rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          :class="{ 'text-foreground': route.path === item.path }"
        >
          {{ item.name }}
        </router-link>
        <span
          ref="indicatorRef"
          class="absolute -bottom-[1px] h-[2px] rounded-full bg-foreground"
          style="visibility: hidden"
        />
      </div>

      <div class="flex items-center gap-1">
        <a
          href="https://github.com/murchey"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Github class="h-4 w-4" />
        </a>

        <button
          class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          @click="toggleDark"
        >
          <Sun v-if="isDark" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </button>

        <button
          class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          @click="toggleMobileMenu"
        >
          <X v-if="mobileMenuOpen" class="h-4 w-4" />
          <Menu v-else class="h-4 w-4" />
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-64 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-64 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="overflow-hidden border-t border-border/30 bg-background/95 backdrop-blur-xl md:hidden"
      >
        <div class="space-y-0.5 px-4 py-3">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            :class="{ 'bg-secondary text-foreground': route.path === item.path }"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>
