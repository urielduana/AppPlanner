<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const config = useRuntimeConfig();
console.log(config.public.apiBase);

const auth = useAuthStore();

const email = ref("");
const password = ref("");

const submit = async () => {
  await auth.login(email.value, password.value);
  navigateTo("/dashboard");
};
</script>

<template>
  <div>
    <div>
      <form @submit.prevent="submit">
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button>Login</button>
      </form>
    </div>
  </div>
</template>
