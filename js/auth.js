import { getUsers } from "./api.js";

async function login(email, password) {
    const users  = await getUsers()
    const resultado = users.find(item => item.email === email && item.password === password)

    if (!resultado) {
        return null
    }
    else {
        // como encontró el usuario acá lo guardamos en  localStorage
        localStorage.setItem("session", JSON.stringify(resultado))
        return resultado
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