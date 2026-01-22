<script setup lang="ts">
import UiButton from "./ui/UiButton.vue";
import UiInput from "./ui/UiInput.vue";

const tasks = useTasksStore();

// Form variables
const title = ref("");
const description = ref("");
const category = ref("");
const dueDate = ref("");

// Loading variable
const loading = ref(false);

const submit = async () => {
  try {
    await tasks.createTask({
      title: title.value,
      description: description.value || undefined,
      category: category.value || undefined,
      dueDate: dueDate.value || undefined,
    });

    // reset form
    title.value = "";
    description.value = "";
    category.value = "";
    dueDate.value = "";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4">
    <h2 class="text-lg font-semibold">New Task</h2>

    <UiInput v-model="title" placeholder="Title" required />
    <UiTextarea v-model="description" placeholder="Description" />
    <UiInput v-model="category" placeholder="Category" />
    <UiInput type="date" v-model="dueDate" />

    <UiButton
      type="submit"
      :disabled="loading"
      variant="primary"
      class="w-full"
    >
      {{ loading ? "Creating..." : "Add Task" }}
    </UiButton>
  </form>
</template>
