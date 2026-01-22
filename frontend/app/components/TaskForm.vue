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
  <div>
    <form @submit.prevent="submit">
      <UiInput type="text" v-model="title" placeholder="Title" required />
      <UiTextarea v-model="description" placeholder="Description" />
      <UiInput type="text" v-model="category" placeholder="Category" />
      <UiInput type="date" v-model="dueDate" placeholder="Due Date" />
      <UiButton type="submit" :disabled="loading" variant="primary">
        {{ loading ? "Creating..." : "Add Task" }}
      </UiButton>
    </form>
  </div>
</template>
