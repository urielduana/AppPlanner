# To-Do App (Nuxt 3 + NestJS)

## 🇬🇧 English

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

## 🇪🇸 Español

Esta es una aplicación completa de gestión de tareas que cuenta con autenticación avanzada y funcionalidades CRUD. Está construida utilizando un stack moderno que separa el frontend del backend.

### Stack Tecnológico

#### Frontend

- **Nuxt 3**: El framework de Vue.js para construir la interfaz de usuario.
- **Tailwind CSS**: Un framework CSS de utilidad primero para el estilo.
- **Axios**: Cliente HTTP basado en promesas para el navegador y node.js.
- **Pinia**: El almacén intuitivo para la gestión del estado en Vue.js.

#### Backend

- **NestJS**: Un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.
- **Prisma ORM**: ORM de próxima generación para Node.js y TypeScript.
- **SQLite**: Base de datos ligera basada en disco (usada para pruebas/desarrollo).
- **JWT**: JSON Web Tokens para autenticación segura.

### Características

- **Autenticación de Usuario**: Inicio de sesión y registro seguros usando JWT.
- **Gestión de Tareas**: Crear, Leer, Actualizar y Eliminar (CRUD) tareas.
- **Gestión de Estado**: Estado centralizado usando Pinia.
- **Diseño Responsivo**: Estilizado con Tailwind CSS.

### Prerrequisitos

- Node.js (v20 o superior recomendado)
- npm

### Instalación

#### Configuración del Backend

1. Navega al directorio del backend:

   ```bash
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Copia `.env.example` a `.env` y configura la URL de tu base de datos y el secreto JWT.

   ```bash
   cp .env.example .env
   ```

4. Ejecuta las migraciones de la base de datos:

   ```bash
   npx prisma migrate dev
   ```

5. Inicia el servidor backend:
   ```bash
   npm run start:dev
   ```

#### Configuración del Frontend

1. Navega al directorio del frontend:

   ```bash
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## License / Licencia

MIT
