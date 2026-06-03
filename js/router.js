// Archivo que permite la navegación entre rutas o hashes sin recargar la página.

import { getSession } from "./auth.js";
import { renderLogin } from "./views/login.js"
import { renderDashboard } from "./views/dashboard.js"
import { renderProjects } from "./views/projects.js"

function router() {
    const hashLocation = window.location.hash
    const session = getSession()

    // Si no hay sesión y el usuario intenta ir a cualquier ruta que no sea login lo redirige a login.
    if (!session && hashLocation != "#/login") {
        window.location.hash = "#/login"
        return 
    }

    switch(hashLocation){
        case "#/login":
            renderLogin()
            break;
        case "#/dashboard":
            renderDashboard()
            break;
        case "#/projects":
            renderProjects()
            break;
        default:
            window.location.hash = "#/login"
    }
}

// Permite la navegacion entre 'hashes' sin recargar la página.
window.addEventListener("hashchange", router)

// Carga la página, sin él, al refrescar el router no sabría en que ruta estás y no renderizaría nada.
window.addEventListener("load", router)

export { router }
