<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

interface LetterPullupProps {
  class?: string
  words: string
  delay?: number
}

const props = defineProps<LetterPullupProps>()

const container = ref<HTMLDivElement | null>(null)
const letters = props.words.split('')
let ctx: gsap.Context

onMounted(() => {
  if (!container.value) return
  ctx = gsap.context(() => {
    gsap.from('.letter-pullup-char', {
      y: 100,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: props.delay ?? 0.05,
    })
  }, container.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="container" class="flex justify-center">
    <h1
      :class="
        cn(
          'font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-7xl md:leading-20',
          props.class,
        )
      "
    >
      <span
        v-for="(letter, index) in letters"
        :key="index"
        class="letter-pullup-char inline-block"
        :style="{ visibility: 'hidden' }"
      >
        <span v-if="letter === ' '">&nbsp;</span>
        <span v-else>{{ letter }}</span>
      </span>
    </h1>
  </div>
</template>
