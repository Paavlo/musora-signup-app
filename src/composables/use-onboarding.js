import { computed, defineAsyncComponent, reactive } from 'vue'
import { useOnboardingValidation } from "@/composables/use-onboarding-validation.js";

const GenreStep = defineAsyncComponent(() => import('@/components/steps/genre-step.vue'));
const InstrumentPage = defineAsyncComponent(() => import('@/components/steps/instrument-step.vue'));
const EmailStep = defineAsyncComponent(() => import('@/components/steps/email-step.vue'));
const WelcomeStep = defineAsyncComponent(() => import('@/components/steps/welcome-step.vue'));

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
