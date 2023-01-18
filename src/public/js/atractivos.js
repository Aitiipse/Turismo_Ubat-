import { listar, listarnoticia, listarruta } from "./firebaseConfig.js";
  
  const formrespuesta = document.getElementById("formulario-container");
  const formrespuestan = document.getElementById("formulario-noticias");
  const formrespuestaruta = document.getElementById("formulario-rutas");
  
  let editStatus = false;
  let id = "";
  

let nombre = document.querySelectorAll(".nombre")[0];
let input0 = document.querySelectorAll(".input0")[0];

  
  window.addEventListener("DOMContentLoaded", async (e) => {
    listar((querySnapshot) => {
     
      querySnapshot.forEach((doc) => {
        const atractivo = doc.data();
        var nombre = atractivo.nombre[0];
        var input0 = atractivo.input0[0];
        var updatedAt = atractivo.updatedAt[0];
        var ruta = atractivo.ruta[0];
        var descripcion = atractivo.descripcion[0];
        var createdAt = atractivo.createdAt[0];
        var a1 = atractivo.a1[0];        
        var a2 = atractivo.a2[0];
        var a3 = atractivo.a3[0];
        var a4 = atractivo.a4[0];
        var a5 = atractivo.a5[0];
        var a6 = atractivo.a6[0];
        var a7 = atractivo.a7[0];
        var a8 = atractivo.a8[0];
        var a9 = atractivo.a9[0];
        var a10 = atractivo.a10[0];
      });
    });
})
