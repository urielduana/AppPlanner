<script setup lang="ts">
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
      <input type="text" v-model="title" placeholder="Title" required />
      <textarea v-model="description" placeholder="Description" />
      <input type="text" v-model="category" placeholder="Category" />
      <input type="date" v-model="dueDate" placeholder="Due Date" />
      <button type="submit" :disabled="loading">
        {{ loading ? "Creating..." : "Add Task" }}
      </button>
    </form>
  </div>
</template>
