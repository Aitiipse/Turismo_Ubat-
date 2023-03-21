const contra = document.getElementById("passwordd");
const ccontraseña = document.getElementById("confirmPassword");
const cerrar=document.getElementById("cerrar");
const titulo = document.getElementById("titulo");
const boton = document.getElementById("boton");
const nombre = document.getElementById("name");
const correo = document.getElementById("email-a");
const formulario = document.getElementById("register-form");
const notification = document.getElementById("notification");
/**** */
let check = document.getElementById("cbox");
let valor
check.addEventListener("click", function () {
    if (check.checked) {
		valor=1;
        boton.disabled = false;
        boton.style.background = "#4B8325"
        google.style.pointerEvents = "auto";
        facebook.style.pointerEvents = "auto";
    } else {
		valor=0
        boton.disabled = true;
        boton.style.background = "#A6A6A6"
        google.style.pointerEvents = "none";
        facebook.style.pointerEvents = "none";
    }

})

