import {listarNoticias,guardarNoticia, eliminarNoticia, getNoticia, actualizarNoticia, getNoticias} from "./firebaseConfig.js";
  
  const formularioNoticias = document.getElementById("formularioN");
  const containerNoticias = document.getElementById("contenedorN");
  
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

        <tr>
          <th>Noticia</th>
          <th>Creado</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
        <tr>
          <td style="font-style: italic;">${noticia.titular} </td>
          <td>${noticia.updatedAt}</td>
          <td><button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          <b> 🖉 </b>
        </button>
          </td>
          <td><button class="btn  btn-delete" data-id="${doc.id}">
          <b>🗑</b> 
        </button></td>
        </tr>

    
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
    const doc = await getNoticia(e.target.dataset.id);
    const { titular, resumen, completa } = doc.data();
    formularioNoticias.titular.value = titular;
    formularioNoticias.resumen.value = resumen;
    formularioNoticias.completa.value = completa;
    editStatus = true;
    id = doc.id;
    formularioNoticias["btn-task-form"].innerText = "Actualizar";
  });
});

formularioNoticias.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { titular, resumen, completa } = formularioNoticias;
  try {
    if (!editStatus) {
      // realizar una nueva publicación
    } else {
      await actualizarNoticia(id, { titular: titular.value, resumen: resumen.value, completa: completa.value });
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

});});
  
  
  