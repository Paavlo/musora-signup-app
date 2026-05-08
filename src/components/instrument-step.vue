<template>
    <div class="w-full">
      <div class=" text-center">
        <h1
            class="text-brand-primary mb-3 text-3xl font-black uppercase tracking-tight"
        >
          Choose Your Instrument
        </h1>

        <p
            class="text-text-primary mx-auto max-w-[620px] text-base leading-relaxed"
        >
          Your Musora membership includes unlimited access to ALL of these
          instruments. Pick one to get started.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-2 mt-8">
        <button
            v-for="instrument in instruments"
            :key="instrument.id"
            class="border-border-primary hover:border-brand-primary flex flex-col items-center justify-center rounded-[8px] border transition-all duration-200 p-4"
            :class="{
            'border-brand-primary shadow-sm bg-brand-surface': onboardingState.instrument === instrument.id,
          }"
            @click="onboardingState.instrument = instrument.id"
        >
          <img :src="getInstrumentIcon(instrument.id)" width="40" height="40" :alt="instrument.label" />

          <span
              class="text-text-primary mt-2 w-[80px] text-sm"
              :class="
                onboardingState.instrument === instrument.id
                  ? 'font-extrabold'
                  : 'font-semibold'
              "
          >
            {{ instrument.label }}
          </span>
        </button>
      </div>
    </div>
</template>

<script setup>
import {useOnboarding} from "@/composables/use-onboarding.js";

const { onboardingState } = useOnboarding();

const getInstrumentIcon = (instrumentId) => {
  return new URL(`/src/assets/icons/${instrumentId}.svg`, import.meta.url).href
}

const instruments = [
  {
    id: 'drum',
    label: 'Drums',
  },
  {
    id: 'piano',
    label: 'Piano',
  },
  {
    id: 'guitar',
    label: 'Guitar',
  },
  {
    id: 'bass',
    label: 'Bass',
  },
  {
    id: 'voice',
    label: 'Voice',
  },
]
</script>
