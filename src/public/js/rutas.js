import { listarruta,guardarruta, eliminarruta, getruta, actualizarruta, getrutas, } from "./firebaseConfig.js";
  
  const formrutas = document.getElementById("formulariorutas");
  const formrespuesta = document.getElementById("formulario-rutas");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    
  
    listarruta((querySnapshot) => {
      formrespuesta.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const ruta = doc.data();
        const atractivo = doc.data();
        formrespuesta.innerHTML += `
        <article class= "cardruta">
            <div class="word">
            <div class="word1">
            <h3>${ruta.ruta}   </h3>
            </div><hr>
            <div class="word4">
            <p>INFORMACION: ${ruta.info}</p>
            </div>
            <div class="word4">
            <p>SITIOS: ${atractivo.ruta}</p>
            </div>
       
        <button id="boton" class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Eliminar
        </button>
        <button id="boton" class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Actualizar
        </button>
        </div>
        </article>
      `;
      });
  
      const btnsDelete = formrespuesta.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await eliminarruta(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = formrespuesta.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getruta(e.target.dataset.id);
            const ruta = doc.data();
            const atractivo = doc.data();

            formrutas["ruta"].value = ruta.ruta;
            formrutas["info"].value = ruta.info;
            formrutas["sitios"].value = atractivo.nombre;
  
            editStatus = true;
            id = doc.id;
            formrutas["agregar"].innerText = "Actualizar";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  formrutas.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const ruta=formulariorutas["ruta"];
    
    const info=formulariorutas["info"];


    
  
    try {
      if (!editStatus) {
        await guardarruta(ruta.value, info.value);
      } else {
        await actualizarruta(id, {
          ruta: ruta.value,
          info: info.value,
          
        });
  
        editStatus = false;
        id = "";
        formrutas["agregar"].innerText = "Agregar";
        formrutas["boton"].innerText = " ";
      }
  
      formrutas.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });







