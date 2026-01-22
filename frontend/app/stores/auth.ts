import axios from "axios";

interface UserPayload {
  userId: number;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  // Defining the state of the store
  state: () => ({
    // token - Authentication token
    token: null as string | null,
    // user - User information
    user: null as UserPayload | null,
    // loading - Loading state
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    // Login action
    async login(email: string, password: string) {
      this.loading = true;

      //   Try-finally block to ensure loading state is reset
      try {
        const config = useRuntimeConfig();

        // Making a POST request to the login endpoint
        const response = await axios.post(
          `${config.public.apiBase}/auth/login`,
          { email, password },
        );

        //  Extracting the token from the response to ensure type safety
        const token = response.data.access_token;

        // Storing the token and user information in the state
        this.token = response.data.token;
        this.user = response.data.user;

        // Setting the authorization header
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        // Storing the token in localStorage for persistence
        localStorage.setItem("auth_token", token);
      } finally {
        this.loading = false;
      }
    },

    // Logout action
    logout() {
      this.token = null;
      this.user = null;
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem("auth_token");
      navigateTo("/login");
    },

    // Initialize the store from localStorage
    initAuth() {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      this.token = token;
      this.user = this.decodeToken(token);
      axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    },

    // Decode JWT token to extract user information
    decodeToken(token: string): UserPayload {
      const parts = token.split(".");

      if (parts.length !== 3) {
        throw new Error("Invalid JWT token");
      }

      const payload = JSON.parse(atob(parts[1]!));

      return {
        userId: payload.sub,
        email: payload.email,
      };
    },

    async register(name: string, email: string, password: string) {
      this.loading = true;
      try {
        const config = useRuntimeConfig();

        // Making a POST request to the register endpoint
        const response = await axios.post(
          `${config.public.apiBase}/auth/register`,
          { name, email, password },
        );

        const token = response.data.access_token;

        if (!token) {
          throw new Error("Invalid token");
        }

        this.token = token;
        this.user = this.decodeToken(token);

        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        localStorage.setItem("auth_token", token);
      } finally {
        this.loading = false;
      }
    },
  },
});
