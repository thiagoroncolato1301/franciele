/* =========================================
   USF MOBILE - APP.JS
========================================= */


/* =========================================
   CONFIGURAÇÃO DO USUÁRIO
========================================= */

const USER = {
    username: "franciele.natal",
    password: "everton123",

    name: "Franciele Dos Santos Natal",
    firstName: "Franciele",

    registration: "202601952",

    course: "Ciências Contábeis",

    semester: "2º semestre",

    campus: "Campinas"
};


/* =========================================
   ELEMENTOS
========================================= */

const loginForm = document.getElementById("login-form");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("login-error");

const togglePassword =
    document.getElementById("toggle-password");

const logoutButton =
    document.getElementById("logout-button");

const bottomNavigation =
    document.getElementById("bottom-navigation");


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    configureUserData();

    configureNavigation();

    configureLogin();

    configurePasswordToggle();

    configureLogout();

    registerServiceWorker();

    checkSession();

});


/* =========================================
   CONFIGURAR DADOS DO USUÁRIO
========================================= */

function configureUserData() {

    const headerName =
        document.getElementById(
            "header-student-name"
        );

    const welcomeName =
        document.getElementById(
            "welcome-name"
        );

    const welcomeCourse =
        document.getElementById(
            "welcome-course"
        );


    if (headerName) {
        headerName.textContent =
            USER.firstName;
    }


    if (welcomeName) {
        welcomeName.textContent =
            USER.firstName;
    }


    if (welcomeCourse) {
        welcomeCourse.textContent =
            USER.course;
    }

}


/* =========================================
   LOGIN
========================================= */

function configureLogin() {

    if (!loginForm) {
        return;
    }


    loginForm.addEventListener(
        "submit",
        handleLogin
    );

}


/* =========================================
   PROCESSAR LOGIN
========================================= */

function handleLogin(event) {

    event.preventDefault();


    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value;


    loginError.textContent = "";


    if (!username || !password) {

        loginError.textContent =
            "Preencha usuário e senha.";

        return;
    }


    if (
        username === USER.username &&
        password === USER.password
    ) {

        sessionStorage.setItem(
            "usf_logged",
            "true"
        );


        usernameInput.value = "";
        passwordInput.value = "";


        showScreen("home");

        return;
    }


    loginError.textContent =
        "Usuário ou senha inválidos.";

}


/* =========================================
   VERIFICAR SESSÃO
========================================= */

function checkSession() {

    const logged =
        sessionStorage.getItem(
            "usf_logged"
        );


    if (logged === "true") {

        showScreen("home");

    } else {

        showScreen("login");

    }

}


/* =========================================
   LOGOUT
========================================= */

function configureLogout() {

    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        () => {

            sessionStorage.removeItem(
                "usf_logged"
            );

            showScreen("login");

        }
    );

}


/* =========================================
   MOSTRAR / ESCONDER SENHA
========================================= */

function configurePasswordToggle() {

    if (!togglePassword) {
        return;
    }


    togglePassword.addEventListener(
        "click",
        () => {

            const isPassword =
                passwordInput.type === "password";


            passwordInput.type =
                isPassword
                    ? "text"
                    : "password";


            togglePassword.textContent =
                isPassword
                    ? "🙈"
                    : "👁";

        }
    );

}


/* =========================================
   NAVEGAÇÃO
========================================= */

function configureNavigation() {

    const navigationButtons =
        document.querySelectorAll(
            "[data-screen]"
        );


    navigationButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const screen =
                        button.dataset.screen;

                    showScreen(screen);

                }
            );

        }
    );

}


/* =========================================
   TROCAR DE TELA
========================================= */

function showScreen(screenName) {

    const screens =
        document.querySelectorAll(
            ".screen"
        );


    screens.forEach(screen => {

        screen.classList.remove(
            "active"
        );

    });


    const targetScreen =
        document.getElementById(
            `${screenName}-screen`
        );


    if (!targetScreen) {

        console.warn(
            `Tela não encontrada: ${screenName}`
        );

        return;
    }


    targetScreen.classList.add(
        "active"
    );


    updateNavigation(
        screenName
    );


    updateBottomNavigationVisibility(
        screenName
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =========================================
   ATUALIZAR MENU INFERIOR
========================================= */

function updateNavigation(
    currentScreen
) {

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(item => {

        const screen =
            item.dataset.screen;


        item.classList.toggle(
            "active",
            screen === currentScreen
        );

    });

}


/* =========================================
   ESCONDER MENU NO LOGIN
========================================= */

function updateBottomNavigationVisibility(
    currentScreen
) {

    if (!bottomNavigation) {
        return;
    }


    if (currentScreen === "login") {

        bottomNavigation.style.display =
            "none";

    } else {

        bottomNavigation.style.display =
            "flex";

    }

}


/* =========================================
   SERVICE WORKER
========================================= */

function registerServiceWorker() {

    if (
        "serviceWorker" in navigator
    ) {

        window.addEventListener(
            "load",
            () => {

                navigator.serviceWorker
                    .register(
                        "service-worker.js"
                    )
                    .then(
                        registration => {

                            console.log(
                                "Service Worker registrado:",
                                registration.scope
                            );

                        }
                    )
                    .catch(
                        error => {

                            console.error(
                                "Erro ao registrar Service Worker:",
                                error
                            );

                        }
                    );

            }
        );

    }

}


/* =========================================
   PREVENIR ZOOM ACIDENTAL
========================================= */

document.addEventListener(
    "gesturestart",
    event => {

        event.preventDefault();

    }
);


/* =========================================
   FEEDBACK DE CLIQUE
========================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {
            return;
        }


        button.classList.add(
            "button-clicked"
        );


        setTimeout(
            () => {

                button.classList.remove(
                    "button-clicked"
                );

            },
            120
        );

    }
);