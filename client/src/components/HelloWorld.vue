<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <p>Vite + Vue3 + TS + TRPC</p>
    <p>To-do: SASS + state?</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
