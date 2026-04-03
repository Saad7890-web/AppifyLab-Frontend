# AppifyLab Frontend

> A modern, scalable React application for the AppifyLab platform — built with speed, clarity, and developer experience in mind.

---

## Tech Stack

| Layer            | Technology      |
| ---------------- | --------------- |
| Framework        | React 19        |
| Build Tool       | Vite            |
| State Management | Zustand         |
| Routing          | React Router v7 |
| HTTP Client      | Axios           |
| Form Handling    | React Hook Form |
| Validation       | Zod             |
| Styling          | Bootstrap       |

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Saad7890-web/AppifyLab-Frontend.git
cd AppifyLab-Frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and set your API base URL:
# VITE_API_BASE_URL=http://localhost:5000/api

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the browser.

| Variable            | Description          | Example                     |
| ------------------- | -------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## Project Structure

```
AppifyLab-Frontend/
├── src/
│   ├── api/            # Centralized Axios API calls
│   ├── app/            # App-level providers and config
│   ├── assets/         # Images, icons, static files
│   ├── components/     # Shared/reusable UI components
│   ├── config/         # Environment and app configuration
│   ├── features/       # Feature modules (self-contained logic)
│   ├── routes/         # Route definitions
│   ├── store/          # Global Zustand state
│   ├── styles/         # Global CSS/styles
│   ├── utils/          # Utility/helper functions
│   ├── App.jsx         # Root component
│   └── main.jsx        # App entry point
├── public/
├── .env
├── docker-compose.yml
├── Dockerfile
├── vite.config.js
└── package.json
```

### Feature Module Structure

Each feature is fully self-contained:

```
features/
└── feed/
    ├── api/         # Feature-specific API calls
    ├── components/  # Feature-specific UI components
    └── store/       # Feature-specific Zustand state
```

---

## Core Features

### Authentication

- User login and registration
- JWT-based token authentication
- Protected routes

### Feed System

- Create and view posts
- Like and comment on posts
- Cursor-based pagination

### Reusable Components

- `PostCard` — displays individual posts
- `CommentSection` — threaded comments
- Modals, forms, and shared UI primitives

---

## Architecture Decisions

### Zustand for State Management

Zustand was chosen over Redux for its minimal boilerplate and simplicity, while still being powerful enough for this scale.

```js
const usePostStore = create((set) => ({
  posts: [],
  setPosts: (data) => set({ posts: data }),
}));
```

### Centralized API Layer

All HTTP requests live in `/api`, keeping components clean and making error handling, auth headers, and request logic easy to manage in one place.

### Path Aliases

The `@` alias maps to `/src`, keeping imports clean regardless of nesting depth.

```js
// Instead of this:
import Button from "../../../components/Button";

// Use this:
import Button from "@/components/Button";
```

### Form Validation

Forms use `react-hook-form` for state management and `zod` for schema-based validation:

```js
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

---

## Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |

---

## Docker

Run the full application using Docker Compose:

```bash
docker-compose up --build
```

---

## Roadmap

Potential improvements for production readiness:

- [ ] Error boundary handling
- [ ] API caching and retry logic (React Query / TanStack Query)
- [ ] Role-based access control (RBAC)
- [ ] Unit and integration tests (Vitest + Testing Library)
- [ ] CI/CD pipeline
- [ ] Code splitting and lazy loading for performance

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).
