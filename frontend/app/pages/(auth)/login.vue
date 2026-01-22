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
  reloadNuxtApp();
};
</script>

<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
      <form @submit.prevent="submit" class="space-y-4 w-80">
        <h1 class="text-2xl mb-4 text-center">Login</h1>
        <UiInput v-model="email" type="email" placeholder="Email" />

        <UiInput v-model="password" type="password" placeholder="Password" />

        <div>
          If you don't have an account, please
          <NuxtLink to="/register" class="text-blue-600 underline"
            >register here</NuxtLink
          >.
        </div>

        <UiButton type="submit" variant="primary">Login</UiButton>
      </form>
    </div>
  </div>
</template>
