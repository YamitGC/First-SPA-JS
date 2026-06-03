import { getUsers } from "./api.js";

async function login(email, password) {
    const users  = await getUsers()
    const resultados = users.find(resultado => resultado.email === email && resultado.password === password)

    if (!resultados) {
        return null
    }
    else {
        // como encontró el usuario acá lo guardamos en  localStorage
        localStorage.setItem("session", JSON.stringify(resultados))
        return resultados
    }
}

function getSession() {
    const session = localStorage.getItem("session")
    const data = JSON.parse(session)
    return data
}

function logout() {
    localStorage.removeItem("session")
}

export { login, getSession, logout }