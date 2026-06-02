const BASE_URL = "http://localhost:3000"

async function getUsers() {
    const response = await fetch(BASE_URL + "/users")
    const data = await response.json()

    return data
}

async function getProjects() {
    const response = await fetch(BASE_URL + "/projects")
    const data = await response.json()

    return data
}

async function createProject(project) {
    const response = await fetch(BASE_URL + "/projects", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project)
    })

    const data = await response.json()
    return data
}

async function updateProject(id, changes) {
    const response = await fetch(BASE_URL + "/projects/" + id, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(changes)
    })

    const data = await response.json()
    return data 
}

async function deleteProject(id) {
    const response = await fetch(BASE_URL + "/projects/" + id , {
        method: "DELETE"
    })
}

export { getUsers, getProjects, createProject, updateProject, deleteProject }