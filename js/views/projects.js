// archivo que maneja el CRUD de proyectos con permisos por rol

import { logout } from "../auth.js";
import { getSession } from "../auth.js";
import { createProject, getProjects, updateProject, deleteProject } from "../api.js";

async function renderProjects() {
    const appContainer = document.querySelector("#app")
    const session = getSession()
    const allProjects = await getProjects()

    let projects
    if (session.role === "collaborator") {
        projects = allProjects.filter(projects => projects.assignedTo === String(session.id))
    }
    else {
        projects = allProjects
    }

    const cards = projects.map(project => `
    <div class="project-card">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-card-footer">
            <span class="badge-status ${project.status.toLowerCase()}">${project.status}</span>
            <div class="project-card-actions">
                ${session.role === "manager" ? `
                    <button class="btn btn-sm btn-outline btn-edit" data-id="${project.id}">Editar</button>
                    <button class="btn btn-sm btn-danger btn-delete" data-id="${project.id}">Eliminar</button>
                ` : `
                    <button class="btn btn-sm btn-outline btn-status" data-id="${project.id}">Cambiar estado</button>
                `}
            </div>
        </div>
    </div>
`).join("")

appContainer.innerHTML = `
    <nav class="navbar">
    <span class="navbar-brand">SPA App</span>
    <div class="navbar-user">
        <span>${session.name}</span>
        <span class="badge-role ${session.role}">${session.role}</span>
        <a href="#/dashboard" class="btn btn-outline btn-sm">Dashboard</a>
        <button class="btn btn-logout" id="btn-logout">Cerrar sesión</button>
    </div>
    </nav>
    <div class="container">
        <div class="section-header">
            <h2>Proyectos</h2>
            ${session.role === "manager" ? `
                <button class="btn btn-primary" id="btn-new-project">+ Nuevo proyecto</button>
            ` : ""}
        </div>
        <div class="projects-grid">
            ${cards.length > 0 ? cards : `
                <div class="empty-state">
                    <p>No hay proyectos disponibles.</p>
                </div>
            `}
        </div>
    </div>
`
document.querySelector("#btn-logout").addEventListener("click", () => {
    logout()
    window.location.hash = "#/login"
})

// lógica para el boton elimninar 
document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", async () => {
        const id = btn.dataset.id // identificador del proyecto a eliminar
        await deleteProject(id)
        await renderProjects()
    })
})

// lógica para el boton editar 
document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", async () => {
        const id = btn.dataset.id
        await renderForm(id)
    })
})

// lógica para el boton cambiar estado para el collaborator 
document.querySelectorAll(".btn-status").forEach(btn => {
    btn.addEventListener("click", async () => {
        const id = btn.dataset.id
        const findProjects = projects.find(project => project.id === id)
        const nextStatus = { "Activo": "Finalizado", "Pendiente": "Activo", "Finalizado": "Pendiente" }
        await updateProject(id, { status: nextStatus[findProjects.status] })
        await renderProjects()
    })
})

const btnNew = document.querySelector("#btn-new-project")
// verifica que exista antes de agregarle el evento, porque si el usuario es collaborator ese botón no existe en el HTML y daría error
if (btnNew) {
    btnNew.addEventListener("click", () => renderForm())
}
}

// Muestra el formulario para crear o editar un proyecto según si recibe un id o no.
async function renderForm(id) {
    let project = null
    const session = getSession()
    if (id) {
        const allProjects = await getProjects()
        project = allProjects.find(project => project.id === id)
    }

    const appContainer = document.querySelector("#app")

    appContainer.innerHTML = `
    <div class="container">
        <div class="form-panel">
            <h3>${id ? "Editar proyecto" : "Nuevo proyecto"}</h3>
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="form-name" value="${project ? project.name : ""}" required />
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="form-description">${project ? project.description : ""}</textarea>
            </div>
            <div class="form-group">
                <label>Estado</label>
                <select id="form-status">
                    <option value="Activo" ${project?.status === "Activo" ? "selected" : ""}>Activo</option>
                    <option value="Pendiente" ${project?.status === "Pendiente" ? "selected" : ""}>Pendiente</option>
                    <option value="Finalizado" ${project?.status === "Finalizado" ? "selected" : ""}>Finalizado</option>
                </select>
            </div>
            <div class="form-group">
                <label>Responsable (ID)</label>
                <input type="text" id="form-assigned" value="${project ? project.assignedTo : ""}" required />
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" id="btn-save">Guardar</button>
                <button class="btn btn-secondary" id="btn-cancel">Cancelar</button>
            </div>
        </div>
    </div>
`

document.querySelector("#btn-cancel").addEventListener("click", () => renderProjects())

document.querySelector("#btn-save").addEventListener("click", async () => {
    const name = document.querySelector("#form-name").value
    const description = document.querySelector("#form-description").value
    const status = document.querySelector("#form-status").value
    const assigned = document.querySelector("#form-assigned").value

    const projectData = {
        name: name,
        description: description,
        status: status,
        assignedTo: assigned
    }
    if (id) {
        await updateProject(id, projectData)
    }
    else {
        await createProject(projectData)
    }

    await renderProjects()
})
}

export { renderProjects }