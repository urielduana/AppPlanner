<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});
</script>

<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
      <div>
        <TaskForm />
      </div>
      <div>
        <TaskList />
      </div>
    </div>
  </div>
</template>
