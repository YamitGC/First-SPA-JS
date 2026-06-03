// Archivo que hace como 'puente' entre todo el proyecto y la base de datos db.json.

const BASE_URL = "http://localhost:3000"

// Trae todos los usuarios de la base de datos. La usa auth.js para verificar credenciales al hacer login.
async function getUsers() {
    const response = await fetch(BASE_URL + "/users")
    const data = await response.json()

    return data
}

// Trae todos los proyectos. La usan dashboard.js y projects.js para mostrar datos.
async function getProjects() {
    const response = await fetch(BASE_URL + "/projects")
    const data = await response.json()

    return data
}

// Recibe un objeto proyecto y lo crea en la base de datos con POST.
async function createProject(project) {
    const response = await fetch(BASE_URL + "/projects", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project)
    })

    const data = await response.json()
    return data
}

// Recibe un id y los campos a modificar, actualiza ese proyecto con PATCH.
async function updateProject(id, changes) {
    const response = await fetch(BASE_URL + "/projects/" + id, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(changes)
    })

    const data = await response.json()
    return data 
}

// Recibe un id y elimina ese proyecto de la base de datos con DELETE.
async function deleteProject(id) {
    const response = await fetch(BASE_URL + "/projects/" + id , {
        method: "DELETE"
    })
}

export { getUsers, getProjects, createProject, updateProject, deleteProject }