# AssignIt Frontend

This repository contains the frontend code for **AssignIt**, a feature-rich project management tool developed as a Final Year Project (FYP). AssignIt provides an intuitive interface for managing workspaces, projects, sprints, tasks, retrospectives, and team collaboration.

**Live Demo:**  
[https://assignit.sharmasaksham.com.np/login](https://assignit.sharmasaksham.com.np/login)  
*Note: The initial load may be slow (about 1 minute) and require a refresh, as the backend is hosted on a free Render service that spins down when not in use.*

---

## Features

- Workspace and project management
- Sprint and task boards with drag-and-drop (Kanban)
- Detailed dashboards with charts and insights
- Role-based access (Project Manager, Developer, QA)
- OTP-based authentication (login/signup)
- Bug tracking and sprint retrospectives
- Team invitations, notifications, and activity logs
- Real-time updates with socket.io
- Responsive, modern UI with dark mode support

---

## Tech Stack

- **Framework:** React 18 + TypeScript
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query
- **Styling:** Tailwind CSS, tailwindcss-animate, custom CSS
- **Routing:** React Router DOM v7
- **Forms & Validation:** React Hook Form, Zod, @hookform/resolvers
- **Rich Text Editing:** React Quill
- **Real-Time:** socket.io-client
- **Build Tool:** Vite
- **Drag & Drop:** @dnd-kit/core
- **Custom Hooks:** @custom-react-hooks/use-media-query

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/saksham310/assignit-frontend.git
    cd assignit-frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables:**
    - Copy `.env.example` to `.env` and set the API base URL and any other required settings.

4. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. **Build for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```

---

## API Integration

AssignIt frontend communicates with the [AssignIt Backend v1 (Node.js + Express + PostgreSQL)](https://github.com/saksham310/assignit-backend-v1) via REST APIs.  
---

## Scripts

- `dev` — Start development server with Vite
- `build` — Build the app for production
- `preview` — Preview the production build
- `lint` — Run ESLint

---

## License

This project is for academic and demonstration purposes.

---

## Related Repositories

- [AssignIt Backend v1 (Node.js/Express/PostgreSQL)](https://github.com/saksham310/assignit-backend-v1)
