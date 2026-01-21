<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: "guest",
});

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
    <div class="min-h-screen flex items-center justify-center">
      <div></div>
      <form @submit.prevent="submit" class="space-y-4 w-80">
        <h1 class="text-2xl mb-4 text-center">Login</h1>
        <input
          v-model="email"
          placeholder="Email"
          class="border p-2 w-full border-slate-600"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="border p-2 w-full border-slate-600"
        />
        <div>
          If you don't have an account, please
          <NuxtLink to="/register" class="text-blue-600 underline"
            >register here</NuxtLink
          >.
        </div>
        <button class="bg-slate-800 text-white w-full p-2">Login</button>
      </form>
    </div>
  </div>
</template>
