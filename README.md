# Kanban Board — Full-Stack Laravel + React

A full-stack Kanban board application built with Laravel, Inertia.js, React, TypeScript, and PostgreSQL. The project focuses on real-world CRUD workflows, relational data modeling, server-side validation and authorization, and complex drag-and-drop interactions with persistent backend state.

## Links

- Live Site URL: [Live site URL](https://kanban-fullstack-laravel.onrender.com)
- GitHub Repository: [Github Repo URL](https://github.com/JiaHe35354/kanban-fullstack-laravel)

## Built with

- [Laravel](https://laravel.com/) - Backend framework, routing, authentication, authorization, validation, and application logic.
- [Inertia.js](https://inertiajs.com/) - Connects Laravel's server-side application with the React frontend without requiring a separate REST API.
- [React](https://react.dev/) - Frontend UI.
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - Styling and responsive UI
- [dnd-kit](https://dndkit.com/) - A modular, accessible drag-and-drop library for React.
- [Docker](https://www.docker.com/) - Containerized the application and development environment.
- [PostgreSQL](https://www.postgresql.org/) - Relational database for persistent application data.

## Features

- Create, view, update, and delete boards, columns, tasks and subtasks
- Mark subtasks as completed
- Move and reorder tasks using drag and drop, including moving tasks between columns and persisting their new position and status.
- Reorder tasks within a column using drag and drop
- Client-side and server-side form validation
- Hide and show the board sidebar
- Light and dark themes
- Persistent application data stored in PostgreSQL
- User authentication and authorization

## Overview

### Project goals

The main goal of this project was to build a full-stack Kanban application with a responsive interface and persistent backend.

A major goal was to strengthen my backend development experience by building the application's server-side architecture with Laravel and PostgreSQL. This included designing relational data models, implementing business logic, server-side validation, authentication, and authorization.

I also wanted to explore how Inertia.js can simplify the connection between a Laravel backend and a React frontend. It allows Laravel to remain responsible for routing, controllers, validation, authentication, and authorization while React handles the UI, without requiring a separate REST API and API client layer.

The project also gave me the opportunity to work on more complex frontend interactions, particularly drag-and-drop state management, optimistic updates, and synchronizing temporary client-side state with persistent backend data.

### Why this version?

This project builds on my previous [Kanban application](https://github.com/JiaHe35354/kanban-task-management), which was developed with Next.js and Firebase Firestore.

For this version, I wanted to gain more experience building and controlling the backend myself. I replaced the managed backend approach with Laravel and PostgreSQL, giving me the opportunity to work directly with relational data modeling, server-side business logic, validation, authentication, and authorization.

I also wanted to explore Inertia.js as a way to connect a Laravel backend with a React frontend while keeping the frontend experience highly interactive.

## Getting started

The Docker Compose setup runs the Laravel application, Vite development server, and PostgreSQL database as separate services.

### Requirements

- Git
- Docker Desktop

### Installation

1. Clone the repository

```bash
git clone https://github.com/JiaHe35354/kanban-fullstack-laravel
cd kanban-fullstack-laravel
```

2. Create the environment file

```bash
cp .env.example .env
```

The provided .env.example is configured to connect Laravel to the PostgreSQL container through the db service.

3. Start the Docker containers

```bash
docker compose up -d --build
```

This starts the Laravel application, Vite development server, and PostgreSQL database.

4. Generate the application key

```bash
docker compose exec app php artisan key:generate
```

5. Run the database migrations

```bash
docker compose exec app php artisan migrate
```

6. Seed the database

```bash
docker compose exec app php artisan db:seed
```

This creates the demo user and sample Kanban data.

7. Open the application

Visit http://localhost:8000 and click Quick Demo or create your account.

### Development commands

- Check the running containers:

```bash
docker compose ps
```

- View Laravel application logs:

```bash
docker compose logs -f app
```

- Stop the development environment:

```bash
docker compose down
```

- To start it again later:

```bash
docker compose up -d
```

## My process

### Development roadmap

I built the application incrementally, starting with the database and application structure, then developing the user interface and core functionality before adding authentication, authorization, and additional user experience improvements.

- **Database & Backend Foundation:** Started by designing the database structure and creating the Laravel models, migrations, relationships, and seed data for boards, columns, tasks, and subtasks. Seeded data also provided a consistent dataset for development and testing.

- **Application Layout & UI:** Built the main application layout and responsive board interface using React and Tailwind CSS. This included the header, sidebar, board columns, task cards, and responsive behavior across different screen sizes.

- **Inertia.js Integration:** Used Inertia.js to connect Laravel controllers and routes with the React frontend, allowing the application to use Laravel's server-side functionality while maintaining a React-based user interface.

- **Core Task Management:** Implemented CRUD functionality for boards, columns, and tasks. Created reusable modals and form components for creating, editing, viewing, and deleting application data.

- **Authentication & Authorization:** Implemented user authentication and authorization. Users can access and manage their own boards while unauthorized access to other users' data is prevented.

- **Validation & User Feedback:** Added client-side and server-side form validation, error handling, and toast notifications to provide clear feedback during user interactions.

- **Drag & Drop:** Integrated @dnd-kit to allow tasks to be reordered within columns and moved between columns. Moving a task between columns also updates its status and persists the change to the database.

- **Themes:** Added light and dark theme support.

- **Docker & Development Environment:** Containerized the Laravel application and supporting services to create a consistent development environment. Configured separate services for the Laravel/PHP application, Vite/Node.js frontend tooling, and PostgreSQL database, and configured the application to communicate between containers through Docker Compose.

- **Production Deployment:** Deployed the application to Render using a production Docker image. Configured the production environment variables and connected the Laravel application to a managed PostgreSQL database. Configured database migrations and seed data as part of the deployment process and enabled automatic deployments from the Git repository.

- **Demo Experience:** Added a quick demo login using seeded data so the application's functionality can be explored without manually creating an account and setting up initial boards.

### Key challenges

- **Drag-and-drop state synchronization:** Drag-and-drop required managing temporary client-side ordering while keeping the persisted backend state consistent. The UI updates optimistically when a task is moved, while the new column and position are sent to Laravel and persisted in PostgreSQL. I also needed to handle the difference between reordering within a column and moving a task between columns.

- **Task ordering:** Tasks use a `position` value within each column. Reordering requires updating the affected tasks while maintaining the correct order in the database. This also needed to remain consistent with the optimistic ordering shown in the React UI.

- **Authorization:** Authorization needed to be enforced on the server rather than relying only on frontend restrictions. Controllers and authorization logic verify that the authenticated user owns the relevant board before allowing resources to be viewed or modified.

### Technical decisions

**Laravel + Inertia + React**

I chose Inertia because it allows Laravel to remain responsible for routing, controllers, validation, authentication, and authorization while React handles the UI, without requiring a completely separate
REST API.

**Task ordering**

Tasks have a `position` value within each column. This allows the database to persist the order independently of the frontend state.

**Drag-and-drop**

The UI updates optimistically when a task is moved, then sends the new column and position to Laravel. The backend validates and persists the change.

**Authorization**

Authorization is enforced on the server so that users cannot access or modify boards that do not belong to them.

**Server state** vs **temporary drag state**

The database remains the source of truth for task positions and column assignments, while React temporarily manages the visual ordering during drag interactions. After a drag operation completes, the resulting state is sent to Laravel for validation and persistence.

**PostgreSQL**

I chose PostgreSQL as a relational database because the application contains relationships between users, boards, columns, tasks, and subtasks. Using a relational database allowed these relationships and ownership constraints to be represented and enforced through the backend.

### AI tools used

AI tools were used as development assistants throughout the project, primarily for exploring implementation approaches, debugging TypeScript and React issues, reviewing architectural approaches, and improving documentation. I reviewed, tested, and adapted the generated suggestions rather than treating them as final implementations.

### Useful resources

- [dnd kit](https://dndkit.com/overview)
- [Theme Switching: Dark, Light, Auto Mode in React](https://sreyas.com/blog/theme-switching-dark-light-auto-mode-in-react/)
