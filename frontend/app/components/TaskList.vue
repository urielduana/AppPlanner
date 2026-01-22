<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks";

const tasks = useTasksStore();

// When view is mounted, fetch tasks
onMounted(() => {
  tasks.fetchTasks();
});
</script>

<template>
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
              {{  task.description }}
              {{ task.dueDate }}
              {{ task.createdAt }}
            </span>
          </label>

          <button @click="tasks.deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
</template>