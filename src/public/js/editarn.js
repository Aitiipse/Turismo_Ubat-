import {listarNoticias,guardarNoticia, eliminarNoticia, getNoticia, actualizarNoticia, getNoticias} from "./firebaseConfig.js";
  
  const formularioNoticias = document.getElementById("formularion");
  const containerNoticias = document.getElementById("contenedorn");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  

    // ----------------------------NOTICIAS-------------------------------------

    listarNoticias((querySnapshot) => {
  
      querySnapshot.forEach((doc) => {
        const noticia = doc.data();
  
        containerNoticias.innerHTML += `


        <div class="lisa_editar">
  
    
      <div><b>${noticia.titular}</b> - - - </div> 
      <div>${noticia.updatedAt}</div>
      <div><button class="btn  btn-delete" data-id="${doc.id}">
      🗑 
    </button>
    <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
      🖉 
    </button></div>
    
  
    </div>
    
    `;
      });
  
      const btnsDelete = containerNoticias.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await eliminarNoticia(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = containerNoticias.querySelectorAll(".btn-edit");
      
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            formularioNoticias.reset();
          try {
            const doc = await getNoticia(e.target.dataset.id);
            const noticia = doc.data();
            formularioNoticias["titular"].value = noticia.titular;
            formularioNoticias["resumen"].value = noticia.resumen;
            formularioNoticias["completa"].value = noticia.completa;            
  
            editStatus = true;
            id = doc.id;
            formularioNoticias["btn-task-form"].innerText = "Actualizar";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });

    formularioNoticias.addEventListener("submit", async (e) => {
      e.preventDefault();
    
      const titular = formularioNoticias["titular"];
      const resumen = formularioNoticias["resumen"];
      const completa = formularioNoticias["completa"];
      
    
      try {
        if (!editStatus) {


        } else {
          await actualizarNoticia(id, {
            titular: titular.value,
            resumen: resumen.value,
            completa: completa.value,
           
          });
    
          editStatus = false;
          id = "";
          formularioNoticias["btn-task-form"].innerText = "Actualizar";
        }
    
        formularioNoticias.reset();
        titular.focus();
      } catch (error) {
        console.log(error);
      }
    });


  });
  
  
  