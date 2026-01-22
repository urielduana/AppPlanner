<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks";

definePageMeta({
  middleware: "auth",
});

const tasks = useTasksStore();

onMounted(() => {
  tasks.fetchTasks();
  console.log(tasks.tasks);
});
</script>

<template>
  <div>
    <div>
      <h1>My Tasks</h1>

      <div v-if="tasks.loading">Loading...</div>
      <div v-if="tasks.error">{{ tasks.error }}</div>

      <ul>
        <li v-for="task in tasks.tasks" :key="task.id">
          <label>
            <input
              type="checkbox"
              :checked="task.completed"
              @change="tasks.toggleTask(task.id, !task.completed)"
            />
            <span ">
              {{ task.title }}
            </span>
          </label>

          <button @click="tasks.deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>
