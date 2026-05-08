import {defineAsyncComponent, reactive} from 'vue'

const GenreStep = defineAsyncComponent(() => import('@/components/genre-step.vue'));
const InstrumentPage = defineAsyncComponent(() => import('@/components/instrument-step.vue'));

const onboardingState = reactive({
  currentStep: 0,
  instrument: null,
  genres: [],
  email: '',
  agreedToMarketing: false,
})

export function useOnboarding() {
  const stepTitles = {
    0: {title: 'instrumental-step', component: InstrumentPage},
    1: {title: 'genre-step', component: GenreStep},
  }

  const nextStep = () => {
    onboardingState.currentStep++
  }

  const prevStep = () => {
    onboardingState.currentStep--
  }

  return {
    stepTitles,
    onboardingState,
    nextStep,
    prevStep,
  }
}
