import { computed, reactive } from 'vue'
import { useOnboardingValidation } from "@/composables/use-onboarding-validation.js";

import GenreStep from '@/components/steps/genre-step.vue';
import InstrumentPage from '@/components/steps/instrument-step.vue';
import EmailStep from '@/components/steps/email-step.vue';
import WelcomeStep from '@/components/steps/welcome-step.vue';

const onboardingState = reactive({
  currentStep: 0,
  instrument: null,
  genres: [],
  email: null,
  agreedToMarketing: false,
})

const { isEmailValid } = useOnboardingValidation()

export function useOnboarding() {

  const stepTitles = computed(() => ({
    0: {
      title: 'instrumental-step',
      component: InstrumentPage,
      isValid: () => !!onboardingState.instrument,
    },
    1: {
      title: 'genre-step',
      component: GenreStep,
      isValid: () => onboardingState.genres.length > 0,
    },
    2: {
      title: 'email-step',
      component: EmailStep,
      isValid: () => isEmailValid.value,
    },
    3: {
      title: 'welcome-step',
      component: WelcomeStep,
      isValid: () => true,
    }
  }));

  const isLastStep = computed(
    () => onboardingState.currentStep === 3
  )

  const isCurrentStepValid = computed(() => {
    return stepTitles.value[onboardingState.currentStep].isValid();
  });

  const nextStep = () => {
    onboardingState.currentStep++
  }

  return {
    stepTitles,
    onboardingState,
    isLastStep,
    isCurrentStepValid,
    nextStep,
  }
}
