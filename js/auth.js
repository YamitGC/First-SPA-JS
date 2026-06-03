// Archivo que autentifica que los datos del usuario en el login sean correctos.

import { getUsers } from "./api.js";

async function login(email, password) {
    const users  = await getUsers()
    const resultados = users.find(resultado => resultado.email === email && resultado.password === password)

    if (!resultados) {
        // Retorna null para indicarle que las credenciales son incorrectas.
        return null
    }
    else {
        // Como encontró el usuario acá lo guardamos en  localStorage
        localStorage.setItem("session", JSON.stringify(resultados))
        return resultados
    }
}

// Función que usan router.js, dashboard.js y projects.js para saber quién está logueado y qué rol tiene.
function getSession() {
    const session = localStorage.getItem("session")
    const data = JSON.parse(session)
    return data
}

function logout() {
    localStorage.removeItem("session")
}

export { login, getSession, logout }