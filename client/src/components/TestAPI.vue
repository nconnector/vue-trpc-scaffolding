<template>
  <div class="test-api">
    <div class="header">counter: {{ counter }}</div>
    <button @click="counterIncrement()">increment</button>
    <button @click="counterReset()">reset</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTRPCClient, useTRPCMutation } from "../api";
import { ApiRouter } from "../../../server/src/main";

const API_URL = import.meta.env.VITE_API_URL;
const { client } = useTRPCClient<ApiRouter>({
  url: API_URL,
});

const counter = ref(0);

const getCounter = async () => {
  return await client.query("counter");
};
const counterIncrement = async (num?: number) => {
  counter.value = await client.mutation("counterIncrement", num);
  return;
};
const counterReset = async () => {
  counter.value = await client.mutation("counterReset");
  return;
};

onMounted(async () => {
  counter.value = await getCounter();
});
</script>

<style scoped lang="scss">
.test-api {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  gap: 0.5rem;
  .header {
    grid-column: span 2;
    background-color: rgb(203, 255, 238);
    border-radius: 8px;
    padding: 0.6em 1.2em;
    border: 1px solid transparent;
  }
}
</style>
