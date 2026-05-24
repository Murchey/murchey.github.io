<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Moon, Sun, Menu, X, Github } from 'lucide-vue-next'

const route = useRoute()
const mobileMenuOpen = ref(false)
const isDark = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '项目', path: '/projects' },
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

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <router-link
        to="/"
        class="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
      >
        Murchey
      </router-link>

      <div class="hidden items-center gap-1 md:flex">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          :class="{ 'text-foreground': route.path === item.path }"
        >
          {{ item.name }}
          <span
            v-if="route.path === item.path"
            class="absolute inset-x-1 -bottom-[1.5px] h-0.5 rounded-full bg-foreground"
          />
        </router-link>
      </div>

      <div class="flex items-center gap-2">
        <a
          href="https://github.com/murchey"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github class="h-5 w-5" />
        </a>

        <button
          class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          @click="toggleDark"
        >
          <Sun v-if="isDark" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>

        <button
          class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground md:hidden"
          @click="toggleMobileMenu"
        >
          <X v-if="mobileMenuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
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
        class="overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-md md:hidden"
      >
        <div class="space-y-1 px-4 py-3">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            :class="{ 'bg-accent text-foreground': route.path === item.path }"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>