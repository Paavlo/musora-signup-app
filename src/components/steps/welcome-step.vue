<template>
  <general-component
      title="Welcome to Musora!"
      title-class="text-[44px]"
      subtitle="Here is your profile:"
      subtitle-class="text-sm"
  >
    <template #fields>
      <div class="flex flex-row flex-wrap justify-between w-full mt-8 relative bg-brand-surface gap-y-6 p-6 rounded-lg">
        <list-item
          v-for="item in listItems"
          :key="item.title"
          class="max-w-[268px] w-full"
          :title="item.title"
          :value="item.value"
        />
      </div>
    </template>
  </general-component>
</template>

<script setup lang="ts">
import GeneralComponent from "@/components/general-component.vue";
import ListItem from "@/components/list-item.vue";
import { useOnboarding } from "@/composables/use-onboarding.ts";
import genres from "@/constants/genres.json";
import instruments from "@/constants/instruments.json";
import { computed } from "vue";

const { onboardingState } = useOnboarding();

const selectedGenres = computed((): string => {
  return genres
    .filter(genreItem => onboardingState.genres.findIndex((genre) => genre === genreItem.key))
    .map(genre => genre.title)
    .join(', ')
});

const selectedInstrument = computed((): string => {
  const instrument = instruments.find(instrument => instrument.id === onboardingState.instrument);
  return instrument ? instrument.label : '';
})


const listItems: Array<Record<string, string>> = [
  { title: 'Instrument', value: selectedInstrument },
  { title: 'Genres', value: selectedGenres.value },
  { title: 'Email', value: onboardingState.email },
  { title: 'Free tips & lessons', value: onboardingState.agreedToMarketing ? 'Yes' : 'No' },
]
</script>

<style scoped lang="scss">

</style>
