# To-Do App (Nuxt 3 + NestJS)

This is a complete task management application featuring advanced authentication and CRUD functionalities. It is built using a modern stack separating the frontend and backend.

### Tech Stack

#### Frontend

- **Nuxt 3**: The Vue.js Framework for building the user interface.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: Promise based HTTP client for the browser and node.js.
- **Pinia**: The intuitive store for Vue.js state management.

#### Backend

- **NestJS**: A progressive Node.js framework for building efficient, scalable server-side applications.
- **Prisma ORM**: Next-generation Node.js and TypeScript ORM.
- **SQLite**: Lightweight disk-based database (used for testing/development).
- **JWT**: JSON Web Tokens for secure authentication.

### Features

- **User Authentication**: Secure login and registration using JWT.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **State Management**: Centralized state using Pinia.
- **Responsive Design**: Styled with Tailwind CSS.

### Architectural Decisions

- **Client-Side Rendering (CSR)** was chosen over SSR.
  - Authentication relies on `localStorage` for JWT persistence.
  - Enabling SSR would require cookie-based auth and extra configuration.
  - Given the scope and time constraints, CSR was a deliberate trade-off.

### Prerequisites

- Node.js (v20 or higher recommended)
- npm

### Installation

#### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and configure your database URL and JWT secret.

   ```bash
   cp .env.example .env
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the backend server:
   ```bash
   npm run start:dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## License / Licencia

MIT
