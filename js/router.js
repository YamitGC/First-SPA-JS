import { getSession } from "./auth.js";
import { renderLogin } from "./views/login.js"
import { renderDashboard } from "./views/dashboard.js"
import { renderProjects } from "./views/projects.js"

function router() {
    const hashLocation = window.location.hash
    const session = getSession()

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

window.addEventListener("hashchange", router)
window.addEventListener("load", router)

export { router }
