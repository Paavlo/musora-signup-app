<template>
  <general-component
      title="Let’s get playing!"
      title-class="text-[44px]"
      subtitle="Enter your email to create your account. You’ll log in with this email to access your lessons."
      subtitle-class="text-sm"
  >
    <template #fields>
      <div class="flex flex-col w-full mt-12 relative">
        <label for="email-step-field" class="text-sm">Email</label>

        <input
            id="email-step-field"
            v-model="onboardingState.email"
            type="email"
            placeholder="Enter your email..."
            class="border-border-primary hover:border-brand-primary flex flex-col items-center justify-center rounded-[4px] border transition-all duration-200 p-4 h-[53px] mt-2"
            :class="{
              '!border-error': emailError,
            }"
            @blur="validateEmail"
        />

        <Transition name="field-error">
          <span v-if="emailError" class="email-step__error text-error mt-1.5 text-sm">
            {{ emailError }}
          </span>
        </Transition>
      </div>
    </template>
  </general-component>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import GeneralComponent from "@/components/general-component.vue";
import { useOnboarding } from "@/composables/use-onboarding.ts";
import {useOnboardingValidation} from "@/composables/use-onboarding-validation.ts";

const { onboardingState } = useOnboarding();
const {
  emailError,
  validateEmail,
} = useOnboardingValidation();

const emailTouched = ref(false)

watch(onboardingState.email, () => {
  if (!emailTouched.value) return
  validateEmail();
})
</script>

<style scoped lang="scss">
.email-step {
  &__error {
    position: absolute;
    bottom: -1.5rem;
  }

}

.field-error {
  &-enter-active,
  &-leave-active {
    transition:
        opacity   200ms ease,
        transform 200ms ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }
}
</style>
<script setup lang="ts">
</script>
