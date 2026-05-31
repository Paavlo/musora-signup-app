# Musora Signup App

Responsive onboarding and signup flow for a music-learning product. The app guides a user through a short multi-step experience, collects their email, lets them choose an instrument and genre, and presents the flow with custom visuals and progress feedback.

- Live demo: https://musora-signup-app.vercel.app
- Repository: https://github.com/Paavlo/musora-signup-app

## What it shows

- Multi-step onboarding flow with welcome, email, instrument, and genre steps
- Reusable Vue components for layout, progress, lists, sidebar, and image slider
- Form validation extracted into composables
- Typed onboarding state and component data
- Responsive SCSS styling with Tailwind CSS and DaisyUI available in the toolchain
- Vercel deployment workflow

## Tech stack

- Vue 3
- TypeScript
- Vite
- SCSS
- Tailwind CSS
- DaisyUI
- ESLint

## Project structure

```text
src/
  components/          Shared UI components
  components/steps/    Onboarding step components
  composables/         Onboarding state and validation logic
  constants/           Instrument and genre data
  types/               TypeScript types
  views/               Page-level onboarding view
  assets/              Icons, images, and global styles
```

## Getting started

```sh
npm install
npm run dev
```

Build for production:

```sh
npm run build
```

Preview production build:

```sh
npm run preview
```

Run linting:

```sh
npm run lint
```

## Notes

This project is useful as a focused frontend case study: component composition, step-based UI state, validation, asset handling, and responsive presentation in a small product-style flow.

## Future improvements

- Add unit tests for the onboarding validation composable
- Add a final confirmation or account creation state
- Improve keyboard and screen reader behavior across the step flow
- Add screenshots or a short demo GIF to the README
