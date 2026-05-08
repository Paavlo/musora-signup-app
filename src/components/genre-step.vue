<template>
  <div class="w-full">
    <div class=" text-center">
      <h1
          class="text-brand-primary mb-3 text-3xl font-black uppercase tracking-tight"
      >
        What genres are you into?
      </h1>

      <p
          class="text-text-primary mx-auto max-w-[620px] text-base leading-relaxed"
      >
        Choose your favorites so we can help you learn them! Pick as many styles as you like.
      </p>
    </div>

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
  </div>
</template>

<script setup>
import genresList from "@/constants/genres.json";
import {useOnboarding} from "@/composables/use-onboarding.js";
import {onMounted} from "vue";

const { onboardingState } = useOnboarding();

const isStepSelected = (genreId) => {
  return onboardingState.genres.findIndex((id) => id === genreId) >= 0;
}

const selectGenre = (genreId) => {
  const genreIndex = onboardingState.genres.findIndex((id) => id === genreId);

  if (isStepSelected(genreId)) {
    onboardingState.genres.splice(genreIndex, 1);
  } else {
    onboardingState.genres.push(genreId);
  }
}
onMounted(() => {
  if (!onboardingState.genres.length) {
    onboardingState.genres = [];
  }
})

</script>

<style scoped lang="scss">

</style>
