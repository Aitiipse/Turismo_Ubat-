
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


  function popUp(URL) {
    window.open(URL, 'Terminos y Condiciones', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=500,height=500,left = 390,top = 50');
}