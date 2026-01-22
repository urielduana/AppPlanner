import axios from "axios";

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
  category?: string;
  dueDate?: string;
  createdAt: string;
}

export const useTasksStore = defineStore("tasks", {
  // Defining the state of the store
  state: () => ({
    // tasks - List of tasks []
    tasks: [] as Task[],
    // loading - Loading state
    loading: false,
    // error - Error message
    error: null as string | null,
    // filters
    filters: {
      completed: "" as "" | "true" | "false",
      category: "",
      search: "",
    },
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter((t) => t.completed),
    pendingTasks: (state) => state.tasks.filter((t) => !t.completed),
  },

  actions: {
    // Fetch tasks from the API
    async fetchTasks() {
      this.loading = true;
      this.error = null;

      try {
        const config = useRuntimeConfig();
        // Making a GET request to fetch tasks - Axios
        const response = await axios.get(`${config.public.apiBase}/tasks`, {
          params: {
            completed: this.filters.completed ?? undefined,
            category: this.filters.category || undefined,
            search: this.filters.search || undefined,
          },
        });
        // Storing the fetched tasks in the state
        this.tasks = response.data;
      } catch {
        this.error = "Failed to load tasks.";
      } finally {
        this.loading = false;
      }
    },

    // Create a new task
    async createTask(data: {
      title: string;
      description?: string;
      category?: string;
      dueDate?: string;
    }) {
      const config = useRuntimeConfig();
      // Making a POST request to create a new task - Axios
      const response = await axios.post(`${config.public.apiBase}/tasks`, data);
      // Adding the new task to the state (Append to tasks array)
      this.tasks.unshift(response.data);
    },

    // Toggle task completion status
    async toggleTask(id: number, completed: boolean) {
      const config = useRuntimeConfig();

      // Making a PATCH request to update the task's completed status - Axios
      await axios.patch(`${config.public.apiBase}/tasks/${id}/complete`, {
        completed,
      });
      // Finding the task in the state
      const task = this.tasks.find((t) => t.id === id);

      // Update the task's completed status in the state
      if (task) {
        task.completed = completed;
      }
    },

    // Delete a task
    async deleteTask(id: number) {
      const config = useRuntimeConfig();

      // Making a DELETE request to remove the task - Axios
      await axios.delete(`${config.public.apiBase}/tasks/${id}`);
      // Removing the task from the state
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    // Update a task
    async updateTask(
      id: number,
      data: {
        title?: string;
        description?: string;
        category?: string;
        dueDate?: string;
      },
    ) {
      const config = useRuntimeConfig();
      // Making a PUT request to update the task - Axios
      const response = await axios.put(
        `${config.public.apiBase}/tasks/${id}`,
        data,
      );

      const index = this.tasks.findIndex((t) => t.id === id);

      // Updating the task in the state
      if (index !== -1) {
        this.tasks[index] = response.data;
      }
    },
  },
});
