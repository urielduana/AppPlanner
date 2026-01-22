<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

const logout = () => {
  auth.logout();
  navigateTo("/");
  reloadNuxtApp();
};
</script>

<template>
  <div>
    <div class="min-h-screen flex flex-col">
      <nav
        class="bg-slate-900 text-white px-6 py-4 flex items-center justify-between"
      >
        <!-- Left -->
        <div class="text-lg font-semibold">AppPlanner</div>

        <!-- Right -->
        <div class="flex items-center gap-4">
          <span class="text-sm opacity-80">
            {{ auth.user?.email }}
          </span>

          <UiButton variant="danger" @click="logout"> Logout </UiButton>
        </div>
      </nav>
      <main>
        <slot />
      </main>

      <div>
        <footer class="bg-slate-100 text-slate-500 text-sm py-3 text-center">
          © {{ new Date().getFullYear() }} AppPlanner — Personal task manager
        </footer>
      </div>
    </div>
  </div>
</template>
