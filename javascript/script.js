// Variables con los inputs del usuario
const formulario  = document.getElementById('formulario');
const userName    = document.getElementById('userName');
const userEmail   = document.getElementById('userEmail');
const userIssue   = document.getElementById('userIssue');
const userMessage = document.getElementById('userMessage');

// Variables con alertas de error o éxito
const alertName    = document.getElementById('alertName');
const alertEmail   = document.getElementById('alertEmail');
const alertIssue   = document.getElementById('alertIssue');
const alertMessage = document.getElementById('alertMessage');
const alertSuccess = document.getElementById('alertSuccess');

// Variables de testeo de inputs
const regUserName    = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regUserEmail   = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/i;
const regUserIssue   = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s.,!?¿¡\-]+$/;
const regUserMessage = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s.,!?¿¡\-:;()'"]+$/;


// Muestra los errores encontrados
const mostrarMensajeError = (errores) => {
    errores.forEach(error => {
        error.tipo.classList.remove("d-none");
        error.tipo.textContent = error.msg;
    })
};


// Testea los campos del formulario, si todo esta bien, muestra un mensaje de éxito.
formulario.addEventListener("submit", e => {
    e.preventDefault();
    alertSuccess.classList.add('d-none');

    const errores = [];

    // Testea el campo "Nombre y Apellido"
    if (!regUserName.test(userName.value) || userName.value.trim().length < 3 || userName.value.trim().length > 50) {
        userName.classList.add("is-invalid");

        errores.push({
            tipo: alertName,
            msg: "Ingrese entre 3 y 50 caracteres y solo letras."
        });

    } else {
        userName.classList.remove("is-invalid");
        userName.classList.add("is-valid");
        alertName.classList.add("d-none");
    }

    // Testea el campo "Tu Email"
    if (!regUserEmail.test(userEmail.value)) {
        userEmail.classList.add("is-invalid");

        errores.push({
            tipo: alertEmail,
            msg: "Escriba un correo válido."
        });
    
    } else {
        userEmail.classList.remove("is-invalid");
        userEmail.classList.add("is-valid");
        alertEmail.classList.add("d-none");
    }

    // Testea el campo "Asunto"
    if (!regUserIssue.test(userIssue.value) || userIssue.value.trim().length < 5 || userIssue.value.trim().length > 100) {
        userIssue.classList.add("is-invalid");

        errores.push({
            tipo: alertIssue,
            msg: "Escriba el motivo del formulario entre 5 y 100 caracteres."
        });

    } else {
        userIssue.classList.remove("is-invalid");
        userIssue.classList.add("is-valid");
        alertIssue.classList.add("d-none");
    }

    // Testea el campo "Comentario"
    if (!regUserMessage.test(userMessage.value) || userMessage.value.trim().length < 10 || userMessage.value.trim().length > 500) {
        userMessage.classList.add("is-invalid");

        errores.push({
            tipo: alertMessage,
            msg: "Escriba el mensaje que quiere enviar en el formulario entre 10 y 500 caracteres."
        })

    } else {
        userMessage.classList.remove("is-invalid");
        userMessage.classList.add("is-valid");
        alertMessage.classList.add("d-none");
    }

    // Testea si hubo errores, muestra los errores en caso positivo
    if (errores.length) {
        mostrarMensajeError(errores);
        return;
    }

    // Si no hay errores, se envia el email
    const serviceID  = 'default_service';
    const templateID = 'template_vn29hwe';

    emailjs.sendForm(serviceID, templateID, formulario)
        .then(() => {
            alertSuccess.classList.remove("d-none");
        }, (err) => {
            console.log("Error:", err);
        });
});