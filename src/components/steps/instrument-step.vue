<template>
  <general-component
    title="Choose Your Instrument"
    subtitle="Your Musora membership includes unlimited access to ALL of these
        instruments. Pick one to get started."
  >
    <template #fields>
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
    </template>
  </general-component>
</template>

<script setup>
import { useOnboarding } from "@/composables/use-onboarding.js";
import GeneralComponent from "@/components/general-component.vue";
import instruments from "@/constants/instruments.json";

const { onboardingState } = useOnboarding();

const getInstrumentIcon = (instrumentId) => {
  return new URL(`/src/assets/icons/${instrumentId}.svg`, import.meta.url).href }
</script>
