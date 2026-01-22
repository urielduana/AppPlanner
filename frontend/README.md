# AppPlanner Frontend (Nuxt 3)

### Overview

This is the frontend for **AppPlanner**, built with **Nuxt 3**.
It consumes the NestJS API and provides authentication, task management, and filtering.

The UI is intentionally simple and clean.

---

### Tech Stack

- **Nuxt 3**
- **Vue 3 (Composition API)**
- **Pinia** – State management
- **Axios** – HTTP client
- **Tailwind CSS** – Styling

---

### SSR Decision (Important)

**Server-Side Rendering (SSR) was intentionally disabled.**

#### Reason:

- Authentication state relies on `localStorage`
- SSR would require cookies and additional configuration
- Given time constraints and project scope, CSR was chosen

This decision:

- Simplifies authentication
- Avoids hydration mismatches
- Is acceptable for a small demo application

This trade-off was intentional and documented.

---

### State Management

- Authentication handled via Pinia
- Token persisted in `localStorage`
- Axios Authorization header set globally
- Route protection via middleware

---

### UI Strategy

- Reusable UI components (`UiInput`, `UiButton`, `UiCard`, etc.)
- Tailwind CSS for fast styling
- Responsive layout using Flexbox and Grid
- Clear separation between logic and presentation

---

### Features

- Login & Register
- Create, edit, delete tasks
- Filters (search, status, category)
- Inline task editing
- Protected dashboard

---

### How to Run

```bash
npm install
npm run dev
```
