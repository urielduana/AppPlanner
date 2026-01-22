<script setup lang="ts">
definePageMeta({
  middleware: "guest",
});

const auth = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");

const submit = async () => {
  await auth.register(name.value, email.value, password.value);
  navigateTo("/dashboard");
  reloadNuxtApp();
};
</script>

<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
      <form @submit.prevent="submit" class="space-y-4 w-80">
        <h1 class="text-2xl mb-4 text-center">Register</h1>
        <UiInput v-model="name" type="text" placeholder="Name" />
        <UiInput v-model="email" type="email" placeholder="Email" />
        <UiInput v-model="password" type="password" placeholder="Password" />

        <div>
          If you already have an account, please
          <NuxtLink to="/login" class="text-blue-600 underline">
            login here </NuxtLink
          >.
        </div>

        <UiButton variant="primary">Register</UiButton>
      </form>
    </div>
  </div>
</template>
