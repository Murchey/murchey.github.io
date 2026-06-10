<script setup lang="ts">
import { ref } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  gradientColor?: string
  gradientOpacity?: number
  gradientSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  gradientColor: '#262626',
  gradientOpacity: 0.8,
  gradientSize: 200,
})

const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)
const cardRef = ref<HTMLElement | null>(null)

function handleMouseMove(e: MouseEvent) {
  const el = cardRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  mouseX.value = x
  mouseY.value = y

  // 3D tilt
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -5
  const rotateY = ((x - centerX) / centerX) * 5
  el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
}

function handleMouseEnter() {
  isHovering.value = true
}

function handleMouseLeave() {
  isHovering.value = false
  const el = cardRef.value
  if (el) {
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }
}
</script>

<template>
  <div
    ref="cardRef"
    :class="cn('card-spotlight relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card/50 backdrop-blur-xl saturate-150 transition-[transform] duration-300 ease-out', props.class)"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Top highlight edge -->
    <div class="pointer-events-none absolute inset-x-0 top-0 z-30 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

    <!-- Spotlight gradient -->
    <div
      class="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
      :style="{
        background: `radial-gradient(${props.gradientSize}px circle at ${mouseX}px ${mouseY}px, ${props.gradientColor}, transparent)`,
        opacity: isHovering ? props.gradientOpacity : 0,
      }"
    />

    <!-- Border glow -->
    <div
      class="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-500"
      :style="{
        background: `radial-gradient(200px circle at ${mouseX}px ${mouseY}px, oklch(0.7 0.18 265 / 0.3), transparent)`,
        padding: '1px',
        opacity: isHovering ? 1 : 0,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }"
    />

    <!-- Glare -->
    <div
      class="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300"
      :style="{
        background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, oklch(1 0 0 / 0.08), transparent 60%)`,
        opacity: isHovering ? 1 : 0,
      }"
    />

    <!-- Content -->
    <div class="relative z-20">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-spotlight {
  transform-style: preserve-3d;
  will-change: transform;
  box-shadow:
    0 0 0 1px oklch(1 0 0 / 0.06),
    inset 0 1px 0 oklch(1 0 0 / 0.1),
    inset 0 -1px 0 oklch(0 0 0 / 0.05),
    inset 1px 0 0 oklch(1 0 0 / 0.04),
    inset -1px 0 0 oklch(1 0 0 / 0.04);
}
.card-spotlight:hover {
  box-shadow:
    0 8px 32px -8px oklch(0 0 0 / 0.15),
    0 0 0 1px oklch(0.7 0.18 265 / 0.12),
    inset 0 2px 0 oklch(1 0 0 / 0.15),
    inset 0 -1px 0 oklch(0 0 0 / 0.08),
    inset 1px 0 0 oklch(1 0 0 / 0.06),
    inset -1px 0 0 oklch(1 0 0 / 0.06);
}
:root.dark .card-spotlight {
  box-shadow:
    0 0 0 1px oklch(1 0 0 / 0.08),
    inset 0 1px 0 oklch(1 0 0 / 0.12),
    inset 0 -1px 0 oklch(0 0 0 / 0.08),
    inset 1px 0 0 oklch(1 0 0 / 0.05),
    inset -1px 0 0 oklch(1 0 0 / 0.05);
}
:root.dark .card-spotlight:hover {
  box-shadow:
    0 8px 32px -8px oklch(0 0 0 / 0.5),
    0 0 0 1px oklch(0.7 0.18 265 / 0.15),
    inset 0 2px 0 oklch(1 0 0 / 0.18),
    inset 0 -1px 0 oklch(0 0 0 / 0.1),
    inset 1px 0 0 oklch(1 0 0 / 0.08),
    inset -1px 0 0 oklch(1 0 0 / 0.08);
}
</style>
