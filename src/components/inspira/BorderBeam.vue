<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed } from 'vue'

interface BorderBeamProps {
  class?: string
  size?: number
  duration?: number
  borderWidth?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

const props = withDefaults(defineProps<BorderBeamProps>(), {
  size: 200,
  duration: 15000,
  anchor: 90,
  borderWidth: 1.5,
  colorFrom: '#ffaa40',
  colorTo: '#9c40ff',
  delay: 0,
})

const containerStyle = computed(() => ({
  '--bb-size': `${props.size}px`,
  '--bb-duration': `${props.duration}s`,
  '--bb-anchor': `${props.anchor}%`,
  '--bb-border-width': `${props.borderWidth}px`,
  '--bb-color-from': props.colorFrom,
  '--bb-color-to': props.colorTo,
  '--bb-delay': `${props.delay}s`,
}) as Record<string, string>)
</script>

<template>
  <div
    :class="cn('border-beam-container pointer-events-none absolute inset-0 rounded-[inherit]', props.class)"
    :style="containerStyle"
  >
    <div class="border-beam-element absolute aspect-square" />
  </div>
</template>

<style scoped>
.border-beam-container {
  border: calc(var(--bb-border-width)) solid transparent;
  mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
  -webkit-mask-clip: padding-box, border-box;
  -webkit-mask-composite: source-in;
}

.border-beam-element {
  width: var(--bb-size);
  animation-delay: var(--bb-delay);
  background: linear-gradient(to left, var(--bb-color-from), var(--bb-color-to), transparent);
  offset-anchor: var(--bb-anchor) 50%;
  offset-path: rect(0 auto auto 0 round var(--bb-size));
  animation: border-beam-anim var(--bb-duration) infinite linear;
}

@keyframes border-beam-anim {
  to {
    offset-distance: 100%;
  }
}
</style>