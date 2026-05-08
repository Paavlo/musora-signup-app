<template>
  <div class="sidebar bg-brand-primary overflow-hidden">
    <div class="sidebar__genre-select flex h-full w-[455px]">
      <transition name="step-forward" mode="out-in" >
        <slider v-if="onboardingState.currentStep === 0" class="m-auto" :cards="cards" :interval="5000" :show-dots="false" />

        <img v-else src="@/assets/images/genre-select.svg" alt="Genre Select" class="w-full m-auto" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import Slider from "@/components/slider.vue";
import { useOnboarding } from "@/composables/use-onboarding.js";
import { getImageUrl } from "@/utils/get-image-url.js";

const { onboardingState } = useOnboarding();

const cards=[
  {
    id: 'piano',
    image: getImageUrl('/src/assets/images/', 'piano', 'jpg'),
    title: 'Piano',
    subtitle: '3 Learning Paths, 62 Artist\nCourses, 950+ Songs',
  },
  {
    id: 'guitar',
    image: getImageUrl('/src/assets/images/', 'guitar', 'jpg'),
    title: 'Guitar',
    subtitle: '3 Learning Paths, 87 Artist Courses, 1500+ Songs',
  },
  {
    id: 'drums',
    image: getImageUrl('/src/assets/images/', 'drumeo', 'jpg'),
    title: 'Drums',
    subtitle: '3 Learning Paths, 340 Artist Courses, 2500+ Songs',
  },
]
</script>

<style lang="scss">
@use '@/assets/styles/step-animation';
</style>
