<script setup lang="ts">
import { useTasksStore, type Task } from "~/stores/tasks";
import UiInput from "./ui/UiInput.vue";
import UiCheckbox from "./ui/UiCheckbox.vue";

const statusOptions = [
  { label: "All", value: null },
  { label: "Pending", value: false },
  { label: "Completed", value: true },
];

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
  () =>
    tasks.filters.search || tasks.filters.category || tasks.filters.completed,
  () => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = window.setTimeout(() => {
      tasks.fetchTasks();
    }, 400);
  },
);

const resetFilters = () => {
  tasks.filters.search = "";
  tasks.filters.category = "";
  tasks.filters.completed = "";
};
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">My Tasks</h2>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <UiInput v-model="tasks.filters.search" placeholder="Search..." />

      <UiSelect v-model="tasks.filters.completed" :options="statusOptions" />

      <UiInput v-model="tasks.filters.category" placeholder="Category" />
    </div>
    <!-- Reset filters -->
    <div class="flex justify-end">
      <UiButton @click="resetFilters" variant="danger">
        Reset Filters
      </UiButton>
    </div>

    <!-- States -->
    <div v-if="tasks.loading">Loading...</div>
    <div v-if="tasks.error" class="text-red-500">{{ tasks.error }}</div>

    <!-- List -->
    <div
      v-for="task in tasks.tasks"
      :key="task.id"
      class="border rounded p-4 bg-white"
    >
      <div v-if="editingId !== task.id" class="flex justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="tasks.toggleTask(task.id, !task.completed)"
            />
            <strong>{{ task.title }}</strong>
          </div>

          <p class="text-sm text-slate-600">{{ task.description }}</p>
          <p class="text-xs text-slate-400">{{ task.dueDate }}</p>
        </div>

        <div class="flex gap-2">
          <UiButton size="sm" @click="startEditing(task)">Edit</UiButton>
          <UiButton
            size="sm"
            variant="danger"
            @click="tasks.deleteTask(task.id)"
          >
            Delete
          </UiButton>
        </div>
      </div>

      <!-- Edit -->
      <div v-else class="space-y-2">
        <UiInput v-model="editForm.title" />
        <UiTextarea v-model="editForm.description" />
        <UiInput type="date" v-model="editForm.dueDate" />
        <UiInput v-model="editForm.category" />

        <div class="flex gap-2">
          <UiButton size="sm" @click="saveEdit(task.id)">Save</UiButton>
          <UiButton size="sm" variant="secondary" @click="cancelEdit">
            Cancel
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>
