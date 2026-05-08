<template>
  <div>
    <div class="text-base text-accent-100">
      {{ title }}
    </div>

    <div class="text-base text-text-primary font-extrabold">
      {{ value }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
})
</script>

<style scoped lang="scss">

</style>
