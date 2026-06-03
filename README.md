# SPA Simulacro — JavaScript Single Page Application

A vanilla JavaScript SPA with role-based access control, built without any frontend frameworks.

## Features

- **Authentication** — Login with email and password, session stored in `localStorage`
- **Role-based access** — Two roles: `manager` and `collaborator`, each with different permissions
- **Project CRUD** — Managers can create, edit and delete projects; collaborators can only update the status of their assigned projects
- **Hash-based routing** — Navigation handled via `window.location.hash`
- **Mock REST API** — Data served with `json-server` from `db.json`

## Project Structure

```
├── index.html
├── db.json
├── css/
│   └── style.css
└── js/
    ├── app.js          # Entry point, initializes the router
    ├── router.js       # Hash-based router
    ├── auth.js         # Login, logout, session management
    ├── api.js          # Fetch calls to json-server
    └── views/
        ├── login.js    # Login view
        ├── dashboard.js # Dashboard with project stats
        └── projects.js  # Project list, create, edit
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [json-server](https://github.com/typicode/json-server) — `npm install -g json-server`
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (VS Code extension)

### Running the app

1. Start the mock API:
   ```bash
   json-server --watch db.json
   ```

2. Open `index.html` with Live Server in VS Code.

3. The app will be available at `http://127.0.0.1:5500`

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Manager | manager@test.com | 1234 |
| Collaborator | user@test.com | abcd |

## Permissions

| Action | Manager | Collaborator |
|--------|---------|--------------|
| View all projects | ✓ | x (own only) |
| Create project | ✓ | x |
| Edit project | ✓ | x |
| Delete project | ✓ | x |
| Change project status | x | ✓ |

## Routes

| Hash | View |
|------|------|
| `#/login` | Login page |
| `#/dashboard` | Dashboard with stats |
| `#/projects` | Project list |