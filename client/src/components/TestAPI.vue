<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTRPCClient, useTRPCMutation } from "../api";

const { client } = useTRPCClient({
  url: "http://localhost:5001/trpc",
});

const user = ref({
  name: "",
  clickCounter: 0,
});
const inputUserName = ref("");

async function createUser() {
  const { name, clickCounter } = await client.mutation("createUser", {
    name: inputUserName.value,
  });
}

onMounted(async () => {
  const { name, clickCounter } = await client.query("getUser");
  user.value = { name, clickCounter };
});
</script>

<template>
  <div>
    Test User: { name: {{ user.name }} clicks: {{ user.clickCounter }}
    }
  </div>
  <input placeholder="name" v-model="inputUserName" />
  <button @click="createUser">create</button>
</template>

<style scoped></style>
