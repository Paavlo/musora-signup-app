<template>
  <div class="slider-wrapper">
    <div class="slider-track">
      <div
          v-for="(card, i) in cards"
          :key="card.id"
          class="card-slot"
          :class="getSlotClass(i)"
          @click="goTo(i)"
      >
        <div class="card">
          <div class="card-border" />

          <img :src="card.image" :alt="card.title" class="card-image" />

          <div class="card-logo">
            <slot name="logo">
              <span class="logo-text">pianote</span>
            </slot>
          </div>

          <div class="card-content">
            <h2 class="card-title justify-center">{{ card.title }}</h2>
            <p class="card-subtitle text-center">{{ card.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showDots" class="dots">
      <button
          v-for="(_, i) in cards"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
          @click="goTo(i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface SliderCard {
  id: string | number
  image: string
  title: string
  subtitle: string
}

const props = withDefaults(defineProps<{
  cards: SliderCard[]
  interval?: number          // ms between slides, default 5000
  pauseOnHover?: boolean
  showDots?: boolean,
}>(), {
  interval: 5000,
  pauseOnHover: true,
  showDots: true,
})

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  current.value = (current.value + 1) % props.cards.length
}

function goTo(i: number) {
  current.value = i
  resetTimer()
}

function startTimer() {
  timer = setInterval(next, props.interval)
}

function resetTimer() {
  if (timer) clearInterval(timer)
  startTimer()
}

// Returns 'prev' | 'active' | 'next' | 'hidden'
function getSlotClass(i: number): string {
  const len = props.cards.length
  const prev = (current.value - 1 + len) % len
  const next = (current.value + 1) % len

  if (i === current.value) return 'is-active'
  if (i === prev)          return 'is-prev'
  if (i === next)          return 'is-next'
  return 'is-hidden'
}

onMounted(startTimer)
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>

<style lang="scss" scoped>
$accent-glow:  rgba(255, 61, 90, 0.45);
$card-radius:  20px;
$card-w:       275px;
$card-h:       500px;
$side-scale:   0.82;
$side-offset:  105%;
$trans-speed:  600ms;
$trans-ease:   cubic-bezier(0.4, 0, 0.2, 1);

// ─── Layout ───────────────────────────────────────────────────
.slider-wrapper {
  display: flex;
  gap: 28px;
  padding: 40px 0 32px;
  user-select: none;
}

.slider-track {
  position: relative;
  width: $card-w;
  height: $card-h;
}

// ─── Card slots ───────────────────────────────────────────────
.card-slot {
  position: absolute;
  inset: 0;
  transition:
      transform $trans-speed $trans-ease,
      opacity   $trans-speed $trans-ease,
      filter    $trans-speed $trans-ease;
  cursor: pointer;

  &.is-active {
    transform: translateX(0) scale(1);
    opacity: 1;
    filter: none;
    z-index: 3;
    pointer-events: none;
  }

  &.is-prev,
  &.is-next {
    opacity: 0.5;
    filter: brightness(0.55);
    z-index: 2;

    .card-border {
      border: 1px solid var(--color-success);
    }
  }

  &.is-prev {
    transform: translateX(-$side-offset);
  }

  &.is-next {
    transform: translateX($side-offset);
  }

  &.is-hidden {
    opacity: 0;
    pointer-events: none;
    z-index: 1;
  }
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: $card-radius;
  overflow: hidden;
  border: 1px solid var(--color-border-secondary);
  box-shadow:
      0 0 12px $accent-glow,
      inset 0 0 12px rgba(var(--color-border-primary), 0.08);


}

.card-border {
  position: absolute;
  inset: 6px;
  border-radius: $card-radius;
  border: 1px solid var(--color-border-red-primary);
  z-index: 10;
  pointer-events: none;
}

.card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: $card-radius;
  border: 1px solid var(#C6CCD6);
}

.card-logo {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}

.logo-text {
  font-family: 'Georgia', serif;
  font-style: italic;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-border-red-primary);
  letter-spacing: -0.02em;
}

.card-content {
  position: absolute;
  bottom: 26px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  padding: 0 30px;
}

.card-title {
  font-family: Open Sans, serif;
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--text-accent) !important;
  margin-bottom: 4px;
  line-height: 100%;
  text-align: center;
}

.card-subtitle {
  font-family: Open Sans,serif;
  font-weight: 400;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 100%;
  text-align: center;
}

.dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  padding: 0;
  transition: all 300ms ease;

  &.active {
    background: var(--color-border-red-primary);
    box-shadow: 0 0 8px $accent-glow;
    transform: scale(1.3);
  }
}

.card-text-enter-active,
.card-text-leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
}

.card-text-enter-from { opacity: 0; transform: translateY(8px); }
.card-text-leave-to   { opacity: 0; transform: translateY(-8px); }
</style>
