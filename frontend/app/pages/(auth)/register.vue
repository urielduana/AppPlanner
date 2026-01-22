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
};
</script>

<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
      <form @submit.prevent="submit" class="space-y-4 w-80">
        <h1 class="text-2xl mb-4 text-center">Register</h1>
        <input
          v-model="name"
          placeholder="Name"
          class="border p-2 w-full border-slate-600"
        />
        <input
          v-model="email"
          placeholder="Email"
          class="border p-2 w-full border-slate-600"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="border p-2 w-full"
        />
        <div>
          If you already have an account, please
          <NuxtLink to="/login" class="text-blue-600 underline">
            login here </NuxtLink
          >.
        </div>
        <button class="bg-slate-800 text-white w-full p-2">Register</button>
      </form>
    </div>
  </div>
</template>
