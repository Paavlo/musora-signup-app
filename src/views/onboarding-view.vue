<template>
  <main class="onboarding-view flex flex-row w-full">
    <div class="onboarding-view__container flex flex-row w-full">
      <sidebar />

      <div class="flex flex-col my-auto max-w-[605px] mx-auto self-center">
        <div class="mb-8 flex justify-center">
          <div class="text-brand-secondary text-5xl font-black">
            <img src="@/assets/icons/musora-icon.svg" alt="Musora Logo" class="h-12" />
          </div>
        </div>

        <progress class="progress text-brand-secondary bg-border-primary mx-auto transition-all duration-200" :value="percentComplete" max="100"></progress>

        <div class="mt-12 mb-8">
          <transition name="step-forward" mode="out-in">
            <component :is="stepTitles[onboardingState.currentStep].component" />
          </transition>
        </div>

        <div class="flex justify-center">
          <button
              class="btn border-0 bg-brand-primary hover:bg-brand-primary-hover h-[40px] w-full max-w-[400px] rounded-full text-base font-bold uppercase tracking-widest text-white shadow-none"
              :disabled="!onboardingState.instrument"
              @click="onboardingState.currentStep++"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import {useOnboarding} from "@/composables/use-onboarding.js";
import {computed} from "vue";
import Sidebar from "@/components/sidebar.vue";


const { onboardingState, stepTitles } = useOnboarding();

const percentComplete = computed(() => {
  const totalSteps = 3;
  const currentStep = onboardingState.currentStep + 1;
  return (currentStep / totalSteps) * 100;
});

</script>

<style lang="scss">
.onboarding-view {
  height: 100vh;

  .progress {
    max-width: 400px;
  }

  // ─── Shared timing ───────────────────────────────────────────
  $step-duration: 380ms;
  $step-easing:   cubic-bezier(0.4, 0, 0.2, 1);
  $step-distance: 40px;

  // ─── Forward (next step) ─────────────────────────────────────
  .step-forward {
    &-enter-active,
    &-leave-active {
      transition:
          opacity   $step-duration $step-easing,
          transform $step-duration $step-easing;
    }

    &-enter-from {
      opacity: 0;
      transform: translateX($step-distance);
    }

    &-leave-to {
      opacity: 0;
      transform: translateX(-$step-distance);
    }
  }

  // ─── Back (previous step) ────────────────────────────────────
  .step-back {
    &-enter-active,
    &-leave-active {
      transition:
          opacity   $step-duration $step-easing,
          transform $step-duration $step-easing;
    }

    &-enter-from {
      opacity: 0;
      transform: translateX(-$step-distance);
    }

    &-leave-to {
      opacity: 0;
      transform: translateX($step-distance);
    }
  }
}
</style>
