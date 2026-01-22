<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});
</script>

<template>
  <div class="min-h-screen p-6">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Task List -->
      <UiCard class="md:col-span-2">
        <TaskList />
      </UiCard>

      <!-- Create Task -->
      <UiCard class="md:col-span-1">
        <TaskForm />
      </UiCard>
    </div>
  </div>
</template>
