<script setup lang="ts">
import { ref } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const cardRef = ref<HTMLElement | null>(null)
const glareRef = ref<HTMLDivElement | null>(null)
const borderRef = ref<HTMLDivElement | null>(null)
const conicRef = ref<HTMLDivElement | null>(null)

function handleMouseMove(e: MouseEvent) {
  const el = cardRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -8
  const rotateY = ((x - centerX) / centerX) * 8
  const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 180

  el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

  if (glareRef.value) {
    glareRef.value.style.background = `radial-gradient(circle at ${x}px ${y}px, oklch(1 0 0 / 0.12), transparent 55%)`
    glareRef.value.style.opacity = '1'
  }

  if (borderRef.value) {
    borderRef.value.style.background = `radial-gradient(circle at ${x}px ${y}px, oklch(0.7 0.18 265 / 0.4), transparent 50%)`
    borderRef.value.style.opacity = '1'
  }

  if (conicRef.value) {
    conicRef.value.style.background = `conic-gradient(from ${angle}deg at ${x}px ${y}px, oklch(0.7 0.2 265 / 0.08), oklch(0.65 0.15 200 / 0.06), oklch(0.7 0.18 300 / 0.05), oklch(0.75 0.15 80 / 0.06), oklch(0.7 0.2 265 / 0.08), transparent 60%)`
    conicRef.value.style.opacity = '1'
  }
}

function handleMouseLeave() {
  const el = cardRef.value
  if (!el) return
  el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  if (glareRef.value) glareRef.value.style.opacity = '0'
  if (borderRef.value) borderRef.value.style.opacity = '0'
  if (conicRef.value) conicRef.value.style.opacity = '0'
}
</script>

<template>
  <div
    ref="cardRef"
    :class="
      cn(
        'card-glass group/bento relative flex flex-col justify-between space-y-4 rounded-2xl border border-white/[0.08] bg-card/50 p-5 backdrop-blur-xl saturate-150 transition-[transform] duration-300 ease-out',
        props.class,
      )
    "
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Top highlight edge -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

    <!-- Conic light trace -->
    <div
      ref="conicRef"
      class="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-500"
    />
    <!-- Glare -->
    <div
      ref="glareRef"
      class="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300"
    />
    <!-- Border glow -->
    <div
      ref="borderRef"
      class="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-300"
      style="padding: 1px; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;"
    />

    <!-- Content -->
    <div class="relative z-20">
      <slot name="header" />
      <div class="mt-4 transition-transform duration-300 group-hover/bento:translate-x-1">
        <slot name="icon" />
        <div class="mb-1 font-sans font-semibold text-foreground">
          <slot name="title" />
        </div>
        <div class="font-sans text-sm leading-relaxed text-muted-foreground">
          <slot name="description" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-glass {
  transform-style: preserve-3d;
  will-change: transform;
  box-shadow:
    0 0 0 1px oklch(1 0 0 / 0.06),
    inset 0 1px 0 oklch(1 0 0 / 0.1),
    inset 0 -1px 0 oklch(0 0 0 / 0.05),
    inset 1px 0 0 oklch(1 0 0 / 0.04),
    inset -1px 0 0 oklch(1 0 0 / 0.04);
}
.card-glass:hover {
  box-shadow:
    0 20px 40px -12px oklch(0 0 0 / 0.2),
    0 0 0 1px oklch(0.7 0.18 265 / 0.15),
    inset 0 2px 0 oklch(1 0 0 / 0.15),
    inset 0 -1px 0 oklch(0 0 0 / 0.08),
    inset 1px 0 0 oklch(1 0 0 / 0.06),
    inset -1px 0 0 oklch(1 0 0 / 0.06);
}
:root.dark .card-glass {
  box-shadow:
    0 0 0 1px oklch(1 0 0 / 0.08),
    inset 0 1px 0 oklch(1 0 0 / 0.12),
    inset 0 -1px 0 oklch(0 0 0 / 0.08),
    inset 1px 0 0 oklch(1 0 0 / 0.05),
    inset -1px 0 0 oklch(1 0 0 / 0.05);
}
:root.dark .card-glass:hover {
  box-shadow:
    0 20px 40px -12px oklch(0 0 0 / 0.5),
    0 0 0 1px oklch(0.7 0.18 265 / 0.2),
    inset 0 2px 0 oklch(1 0 0 / 0.18),
    inset 0 -1px 0 oklch(0 0 0 / 0.1),
    inset 1px 0 0 oklch(1 0 0 / 0.08),
    inset -1px 0 0 oklch(1 0 0 / 0.08);
}
</style>
