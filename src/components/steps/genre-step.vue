<template>
  <general-component
    title="What genres are you into?"
    subtitle="Choose your favorites so we can help you learn them! Pick as many styles as you like."
  >
    <template #fields>
      <div class="flex flex-wrap gap-2 mt-8">
        <button
          v-for="item in genresList"
          :key="item.key"
          class="border-border-primary hover:border-brand-primary flex flex-col justify-center rounded-[8px] border transition-all duration-200 p-4 w-[194px] h-[53px]"
          :class="{
            'border-brand-primary shadow-sm bg-brand-surface': isStepSelected(item.key),
          }"
          @click="selectGenre(item.key)"
        >
          <span
            class="text-text-primary text-left text-sm"
            :class="
              isStepSelected(item.key)
                ? 'font-extrabold'
                : 'font-semibold'
            "
          >
            {{ item.title }}
          </span>
        </button>
      </div>
    </template>
  </general-component>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import GeneralComponent from '@/components/general-component.vue';
import { useOnboarding } from '@/composables/use-onboarding';
import genresList from '@/constants/genres.json';

const { onboardingState } = useOnboarding();

const isStepSelected = (genreId: string) => {
  return onboardingState.genres.findIndex((id) => id === genreId) >= 0;
};

const selectGenre = (genreId: string) => {
  const genreIndex = onboardingState.genres.findIndex((id) => id === genreId);

  if (isStepSelected(genreId)) {
    onboardingState.genres.splice(genreIndex, 1);
  } else {
    onboardingState.genres.push(genreId);
  }
};
onMounted(() => {
  if (!onboardingState.genres.length) {
    onboardingState.genres = [];
  }
});

</script>

<style scoped lang="scss">

</style>
