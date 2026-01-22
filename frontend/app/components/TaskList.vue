<script setup lang="ts">
import { useTasksStore, type Task } from "~/stores/tasks";

const tasks = useTasksStore();

// When view is mounted, fetch tasks
onMounted(() => {
  tasks.fetchTasks();
});

// Editing methods
// Edit variables
const editingId = ref<number | null>(null);
const editForm = ref({
  title: "",
  description: "",
  dueDate: "",
  category: "",
  completed: false,
});

const startEditing = (task: Task) => {
  editingId.value = task.id;

  editForm.value = {
    title: task.title,
    description: task.description ?? "",
    dueDate: task.dueDate
      ? task.dueDate.slice(0, 10) // para input date
      : "",
    category: task.category ?? "",
    completed: task.completed!,
  };
};
const saveEdit = async (taskId: number) => {
  await tasks.updateTask(taskId, {
    ...editForm.value,
  });

  editingId.value = null;
};

const cancelEdit = () => {
  editingId.value = null;
};

// Filter
let searchTimeout: number | null = null;

watch(
  () => tasks.filters.search || tasks.filters.category,
  () => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = window.setTimeout(() => {
      tasks.fetchTasks();
    }, 400);
  },
);
</script>

<template>
  <div>
    <h1>My Tasks</h1>

    <div v-if="tasks.loading">Loading...</div>
    <div v-if="tasks.error">{{ tasks.error }}</div>

    <div class="flex gap-2 mb-4">
      <!-- Search -->
      <input
        v-model="tasks.filters.search"
        placeholder="Search tasks by title..."
        class="border p-2"
      />

      <!-- Status -->
      <select
        v-model="tasks.filters.completed"
        @change="tasks.fetchTasks"
        class="border p-2"
      >
        <option value="">All</option>
        <option value="false">Pending</option>
        <option value="true">Completed</option>
      </select>

      <!-- Category -->
      <input
        v-model="tasks.filters.category"
        placeholder="Category"
        class="border p-2"
      />
    </div>
    <ul>
      <li v-for="task in tasks.tasks" :key="task.id">
        <!-- VIEW MODE -->
        <div v-if="editingId !== task.id">
          <label>
            <input
              type="checkbox"
              :checked="task.completed"
              @change="tasks.toggleTask(task.id, !task.completed)"
            />

            <strong>{{ task.title }}</strong>
            <p>{{ task.description }}</p>
            <small>{{ task.dueDate }}</small>
          </label>

          <button @click="startEditing(task)">Edit</button>
          <button @click="tasks.deleteTask(task.id)">Delete</button>
        </div>

        <!-- EDIT MODE -->
        <div v-else>
          <input v-model="editForm.title" placeholder="Title" required />
          <textarea v-model="editForm.description" placeholder="Description" />
          <input type="date" v-model="editForm.dueDate" />
          <input v-model="editForm.category" placeholder="Category" />

          <label>
            <input type="checkbox" v-model="editForm.completed" />
            Completed
          </label>

          <button @click="saveEdit(task.id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </li>
    </ul>
  </div>
</template>
