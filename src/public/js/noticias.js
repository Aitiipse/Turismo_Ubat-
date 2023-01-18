import { listarnoticia,guardarnoticia, eliminarnoticia, getnoticia, actualizarnoticia, getnoticias, } from "./firebaseConfig.js";
  
  const formnoticias = document.getElementById("formularionoticias");
  const formrespuesta = document.getElementById("formulario-noticias");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getnoticias();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    listarnoticia((querySnapshot) => {
      formrespuesta.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const noticia = doc.data();
  
        formrespuesta.innerHTML += `<br>
        <article class= "card">
            <div class="word">
            <h3>${noticia.titular}   </h3>
            <h4>RESUMEN ${noticia.resumen}</h4>
            <p>COMPLETA ${noticia.completa} </p>
            <p>LINK ${noticia.link}</p>
       
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Eliminar
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
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
            await eliminarnoticia(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = formrespuesta.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getnoticia(e.target.dataset.id);
            const noticia = doc.data();
            formnoticias["titular"].value = noticia.titular;
            formnoticias["resumen"].value = noticia.resumen;
            formnoticias["completa"].value = noticia.completa;
            formnoticias["link"].value = noticia.link;
            
  
            editStatus = true;
            id = doc.id;
            formnoticias["agregar"].innerText = "Actualizar";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  formnoticias.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const titular=formularionoticias["titular"];
    const resumen=formularionoticias["resumen"];
    const completa=formularionoticias["completa"];
    const link=formularionoticias["link"];
    

    
  
    try {
      if (!editStatus) {
        await guardarnoticia(titular.value, resumen.value, completa.value, link.value);
      } else {
        await actualizarnoticia(id, {
          titular: titular.value,
          resumen: resumen.value,
          completa: completa.value,
          link: link.value,
          
        });
  
        editStatus = false;
        id = "";
        formnoticias["agregar"].innerText = "Agregar";
      }
  
      formnoticias.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });







