import { computed, reactive } from 'vue';


import EmailStep from '@/components/steps/email-step.vue';
import GenreStep from '@/components/steps/genre-step.vue';
import InstrumentPage from '@/components/steps/instrument-step.vue';
import WelcomeStep from '@/components/steps/welcome-step.vue';
import { useOnboardingValidation } from '@/composables/use-onboarding-validation';
import { type OnboardingState, OnboardingSteps } from '@/types/use-onboarding-type';

const onboardingState = reactive<OnboardingState>({
  currentStep: OnboardingSteps.INSTRUMENTAL,
  instrument: null,
  genres: [],
  email: null,
  agreedToMarketing: false,
});

const { isEmailValid } = useOnboardingValidation();

export function useOnboarding() {
  const stepTitles = computed(() => ({
    [OnboardingSteps.INSTRUMENTAL]: {
      title: 'instrumental-step',
      component: InstrumentPage,
      isValid: () => !!onboardingState.instrument,
    },
    [OnboardingSteps.GENRE]: {
      title: 'genre-step',
      component: GenreStep,
      isValid: () => onboardingState.genres.length > 0,
    },
    [OnboardingSteps.EMAIL]: {
      title: 'email-step',
      component: EmailStep,
      isValid: () => isEmailValid.value,
    },
    [OnboardingSteps.WELCOME]: {
      title: 'welcome-step',
      component: WelcomeStep,
      isValid: () => true,
    },
  }));

  const isLastStep = computed(
    () => onboardingState.currentStep === 3,
  );

  const isCurrentStepValid = computed((): boolean => {
    return stepTitles.value[onboardingState.currentStep].isValid();
  });

  const nextStep = () => {
    onboardingState.currentStep++;
  };

  return {
    stepTitles,
    onboardingState,
    isLastStep,
    isCurrentStepValid,
    nextStep,
  };
}
