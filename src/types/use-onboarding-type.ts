export enum OnboardingSteps {
  INSTRUMENTAL = 0,
  GENRE = 1,
  EMAIL = 2,
  WELCOME = 3,
}

export type OnboardingState = {
  currentStep: OnboardingSteps;
  instrument: string | null,
  genres: Array<string>,
  email: string | null,
  agreedToMarketing: boolean,
}
