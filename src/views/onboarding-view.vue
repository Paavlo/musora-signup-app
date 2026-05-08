<template>
  <main class="onboarding-view flex flex-row w-full">
    <div class="onboarding-view__container flex flex-row w-full">
      <transition name="step-forward" mode="in-out">
        <sidebar v-if="onboardingState.currentStep < 2" />
      </transition>

      <div class="flex flex-col my-auto w-[605px] mx-auto self-center">
        <div class="flex justify-center">
          <div class="text-brand-secondary text-5xl font-black">
            <img src="@/assets/icons/musora-icon.svg" alt="Musora Logo" class="h-12" />
          </div>
        </div>

        <transition name="step-forward" mode="in-out">
          <progress-bar
              v-if="!isLastStep"
              class="progress text-brand-secondary bg-border-primary mx-auto mt-8 h-[10px]"
              :value="percentComplete" max="100"
          />
        </transition>

        <div class="mt-12 mb-8">
          <transition name="step-forward" mode="out-in">
            <component ref="currentStepComponent" :is="stepTitles[onboardingState.currentStep].component" />
          </transition>
        </div>

        <div v-if="!isLastStep" class="flex justify-center">
          <button
              class="btn border-0 bg-brand-primary hover:bg-brand-primary-hover h-[40px] w-full max-w-[400px] rounded-full text-base font-bold uppercase tracking-widest text-white shadow-none"
              :disabled="!isCurrentStepValid"
              @click="nextStep"
          >
            {{ buttonText }}
          </button>
        </div>

        <template v-if="onboardingState.currentStep === 2">
          <label class="flex flex-row items-center justify-center text-xs mt-12">
            <input v-model="onboardingState.agreedToMarketing" type="checkbox" class="checkbox me-2" />

            Send me tips, free lessons, and special offers by email.
          </label>

          <h6 class="absolute bottom-12 translate-[-50%] left-[50%] text-center mt-auto">
            By continuing you agree with Musora’s <span class="onboarding-view__term-of-use">Terms of Use</span> and <span class="onboarding-view__term-of-use">Privacy Policy</span>
          </h6>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useOnboarding } from "@/composables/use-onboarding.js";
import { computed, ref } from "vue";
import Sidebar from "@/components/sidebar.vue";
import ProgressBar from "@/components/progress-bar.vue";


const { onboardingState, stepTitles, isLastStep, isCurrentStepValid, nextStep } = useOnboarding();

const currentStepComponent = ref();

const percentComplete = computed(() => {
  const totalSteps = 3;
  const currentStep = onboardingState.currentStep + 1;
  return (currentStep / totalSteps) * 100;
});

const buttonText = computed(() => {
  if (onboardingState.currentStep > 1) {
    return 'Let’s Go!';
  }
  return 'Next';
});

</script>

<style lang="scss">
@use '@/assets/styles/step-animation';

.onboarding-view {
  height: 100vh;

  .progress {
    max-width: 400px;
  }

  &__term-of-use {
    color: var(--color-warning);
  }
}
</style>
