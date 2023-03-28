
/*****************************modal de inicio de sesion*******************************/
let abrirSesion = document.querySelectorAll(".modal_IS_abrir")[0];
let navP = document.querySelectorAll(".navP")[0];
let cerrarSesion = document.querySelectorAll(".cerrar_modal_IS")[0];
let modalSesion = document.querySelectorAll(".modal_container_IS")[0];
let modalSesion2 = document.querySelectorAll(".modal_IS")[0];

abrirSesion.addEventListener("click", function () {
    modalSesion.style.opacity = "1";
    navP.style.visibility = "hidden";
    modalSesion.style.visibility = "visible";
    modalSesion2.classList.toggle("modal_cerrado_IS")
})

cerrarSesion.addEventListener("click", function () {
    modalSesion2.classList.toggle("modal_cerrado_IS");
    setTimeout(function () {
        modalSesion.style.opacity = "0";
    navP.style.visibility = "visible";
        modalSesion.style.visibility = "hidden";
    }, 900)
})

window.onclick = function(event) {
    if (event.target == modalSesion) {
      modalSesion.style.display = "none";
    }
  }

/*****************************modal publicaciones*******************************/
let publicaciones = document.querySelectorAll(".publicaciones")[0];
let modalPublicacion = document.querySelectorAll(".modal_container_P")[0];
let cerrarPublicacion = document.querySelectorAll(".cerrar_modal_P")[0];
let modalPublicacion2 = document.querySelectorAll(".modal_P")[0];
publicaciones.addEventListener("click", function () {

    modalPublicacion.style.opacity = "1";
    modalPublicacion.style.visibility = "visible";
    modalPublicacion2.classList.toggle("modal_cerrado_P")


})
cerrarPublicacion.addEventListener("click", function () {
    modalPublicacion2.classList.toggle("modal_cerrado_P");
    setTimeout(function () {
        modalPublicacion.style.opacity = "0";
        modalPublicacion.style.visibility = "hidden";
    }, 900)
})
let C1 = document.querySelectorAll(".C")[0];
let E1 = document.querySelectorAll(".E")[0];
let P1 = document.querySelectorAll(".P")[0];
let B1 = document.querySelectorAll(".B")[0];
let C = document.querySelectorAll(".modal_crear")[0];
let E = document.querySelectorAll(".modal_editar")[0];
let P = document.querySelectorAll(".modal_publicar")[0];
let B = document.querySelectorAll(".modal_borrar")[0];

C1.addEventListener("click", function () {
    C.style.visibility = "visible"
    C.style.height = "60%";
    E.style.visibility = "hidden";
    E.style.height = "0px";
    P.style.visibility = "hidden";
    P.style.height = "0px";
    B.style.visibility = "hidden";
    B.style.height = "0px";
})
E1.addEventListener("click", function () {
    E.style.visibility = "visible"
    E.style.height = "auto";
    C.style.visibility = "hidden";
    C.style.height = "0px";
    P.style.visibility = "hidden";
    P.style.height = "0px";
    B.style.visibility = "hidden";
    B.style.height = "0px";
})
P1.addEventListener("click", function () {
    P.style.visibility = "visible"
    P.style.height = "auto";
    E.style.visibility = "hidden";
    E.style.height = "0px";
    C.style.visibility = "hidden";
    C.style.height = "0px";
    B.style.visibility = "hidden";
    B.style.height = "0px";
})
B1.addEventListener("click", function () {
    B.style.visibility = "visible"
    B.style.height = "auto";
    E.style.visibility = "hidden";
    E.style.height = "0px";
    P.style.visibility = "hidden";
    P.style.height = "0px";
    C.style.visibility = "hidden";
    C.style.height = "0px";
})

/***check */
function popUp(URL) {
    window.open(URL, 'Terminos y Condiciones', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=500,height=500,left = 390,top = 50');
}