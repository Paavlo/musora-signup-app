<template>
  <div class="w-full min-w-[145px]">
    <div class="text-center">
      <h1
        class="text-brand-primary mb-3 font-black uppercase"
        :class="[titleClass]"
      >
        {{ title }}
      </h1>

      <p
        class="text-text-primary mx-auto max-w-[620px]"
        :class="[subtitleClass]"
      >
        {{ subtitle }}
      </p>
    </div>

    <slot name="fields" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  titleClass: { type: String, required: false, default: 'text-3xl' },
  subtitleClass: { type: String, required: false, default: 'text-base' },
});
</script>
