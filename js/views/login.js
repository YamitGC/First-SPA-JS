import { login } from "../auth.js";
import { router } from "../router.js";

function renderLogin() {
    const appContainer = document.querySelector("#app");

    appContainer.innerHTML = `
    <div class="login-wrapper">
        <div class="login-card">
            <h2>Iniciar sesión</h2>
            <p>Ingresa tus credenciales para continuar</p>

            <div id="login-error" class="alert alert-error" style="display:none"></div>

            <form id="login-form">
                <div class="form-group">
                    <label>Correo electrónico</label>
                    <input type="email" id="login-email" placeholder="correo@ejemplo.com" required />
                </div>
                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" id="login-password" placeholder="••••••••" required />
                </div>
                <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
        </div>
    </div>
`
const loginForm = document.querySelector("#login-form")
loginForm.addEventListener("submit", async (event) => {
    // evita que el formulario recargue la página
    event.preventDefault()

    const email = document.querySelector("#login-email").value // .value lee el texto que el usuario escribió dentro del input
    const password = document.querySelector("#login-password").value
    const user = await login(email, password)
    if (!user) {
        const errorDiv = document.querySelector("#login-error")
        errorDiv.textContent = "Correo o contraseña incorrectos"
        errorDiv.style.display = "block"
    }
    else {
        window.location.hash = "#/dashboard"
        router()
    }
})
}

export { renderLogin }