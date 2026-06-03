import { getSession } from "../auth.js";
import { getProjects } from "../api.js";
import { logout } from "../auth.js";

async function renderDashboard() {
    const appContainer = document.querySelector("#app")
    const session = getSession()
    const projects = await getProjects()
    const total = projects.length
    const activeProjects = projects.filter(project => project.status === "Activo") 
    const finishedProjects = projects.filter(project => project.status === "Finalizado")
    const collaboratorProjects = projects.filter(project => project.assignedTo === String(session.id))

    let html = ""

if (session.role === "manager") {
    html = `
        <nav class="navbar">
            <span class="navbar-brand">SPA App</span>
            <div class="navbar-user">
                <span>${session.name}</span>
                <span class="badge-role ${session.role}">${session.role}</span>
                <a href="#/projects" class="btn btn-outline btn-sm">Proyectos</a>
                <button class="btn btn-logout" id="btn-logout">Cerrar sesión</button>
            </div>
        </nav>
        <div class="container">
            <h1>Bienvenido, ${session.name} 👋</h1>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total de proyectos</h3>
                    <p class="stat-number">${total}</p>
                </div>
                <div class="stat-card active">
                    <h3>Proyectos activos</h3>
                    <p class="stat-number">${activeProjects.length}</p>
                </div>
                <div class="stat-card finished">
                    <h3>Proyectos finalizados</h3>
                    <p class="stat-number">${finishedProjects.length}</p>
                </div>
            </div>
        </div>
    `
} else {
    html = `
        <nav class="navbar">
            <span class="navbar-brand">SPA App</span>
            <div class="navbar-user">
                <span>${session.name}</span>
                <span class="badge-role ${session.role}">${session.role}</span>
                <a href="#/projects" class="btn btn-outline btn-sm">Proyectos</a>
                <button class="btn btn-logout" id="btn-logout">Cerrar sesión</button>
            </div>
        </nav>
        <div class="container">
            <h1>Bienvenido, ${session.name} 👋</h1>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Proyectos asignados</h3>
                    <p class="stat-number">${collaboratorProjects.length}</p>
                </div>
            </div>
        </div>
    `
}

appContainer.innerHTML = html

document.querySelector("#btn-logout").addEventListener("click", () => {
    logout()
    window.location.hash = "#/login"
})

}

export { renderDashboard }