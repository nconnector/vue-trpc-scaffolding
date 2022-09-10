<template>
  <h1>{{ msg }}</h1>
  <div class="container">
    <div class="repo">
      <span class="header">Client:</span>
      <span>Vue3 + Vite</span>
      <span>TypeScript</span>
      <span>tRPC</span>
    </div>
    <div class="repo">
      <span class="header">Server:</span>
      <span>Express</span>
      <span>TypeScript </span>
      <span>tRPC</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  gap: 5rem;
  .repo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  .header {
    font-size: 1.25em;
    font-weight: bold;
  }
}
</style>
