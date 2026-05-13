import { computed, ref, watch } from 'vue';

import { useOnboarding } from '@/composables/use-onboarding';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailError = ref('');
const emailTouched = ref(false);

export function useOnboardingValidation() {
  const { onboardingState } = useOnboarding();

  const isEmailValid = computed(() => {
    return EMAIL_REGEX.test(onboardingState.email || '');
  });

  const validateEmail = () => {
    emailTouched.value = true;

    if (!onboardingState.email) {
      emailError.value = 'Email is required';
    } else if (!isEmailValid.value) {
      emailError.value = 'Please enter a valid email address';
    } else {
      emailError.value = '';
    }
  };

  watch(
    () => onboardingState.email,
    () => {
      if (!emailTouched.value) return;

      validateEmail();
    },
  );

  return {
    emailError,
    emailTouched,
    isEmailValid,
    validateEmail,
  };
}
