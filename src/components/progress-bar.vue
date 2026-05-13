<template>
  <div
      class="progress-bar bg-border-primary mx-auto mt-8"
  >
    <div
        class="progress-bar__fill bg-brand-secondary"
        :style="{
        width: `${normalizedValue}%`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },

  max: {
    type: Number,
    default: 100,
  },
})

const normalizedValue = computed(() => {
  if (props.value <= 0) return 0
  if (props.value >= props.max) return 100

  return (props.value / props.max) * 100
})
</script>

<style scoped lang="scss">
.progress-bar {
  position: relative;

  width: 100%;

  overflow: hidden;
  border-radius: 9999px;

  &__fill {
    height: 100%;
    border-radius: inherit;

    transition:
        width 400ms ease,
        background-color 200ms ease;

    will-change: width;
  }
}
</style>
