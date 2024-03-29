import { listarNoticias, guardarNoticia, eliminarNoticia, getNoticia, actualizarNoticia, getNoticias } from "./firebaseConfig.js";

const formularioNoticias = document.getElementById("formulario");
const containerNoticias = document.getElementById("contenedorN");
let mensaje = undefined;

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

    const btnsDelete = containerNoticias.getElementsByClassName("btn-delete");

    const deleteNoticia = async (id) => {
      if (confirm('ESTA SEGURO QUE DESEA ELIMINAR?')) {
        try {
          await eliminarNoticia(id);
          alert('REGISTRO ELIMINADO');

        } catch (error) {
          console.log(error);
          alert('NO SE COMPLETO LA ACCIÓN');

        }
        location.reload(); // Recargar la página después de eliminar
      }
    };

    Array.from(btnsDelete).forEach((btn) =>
      btn.addEventListener("click", ({ target: { dataset: { id } } }) =>
        deleteNoticia(id)
      )
    );


    const btnsEdit = containerNoticias.querySelectorAll(".btn-edit");

    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        formulario.addEventListener("submit", (event) => {
          event.preventDefault();

          // Limpiar los campos del formulario
          const campos = formularioNoticias.querySelectorAll("input, textarea");
          campos.forEach((campo) => {
            campo.value = "";
          });

          // Resto del código...
        });


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
        // await guardarNoticia(titular.value, resumen.value, completa.value, street.value, a1.value, a2.value, a3.value, a4.value, a5.value, a6.value, a7.value, a8.value, a9.value, a10.value);
      } else {
        await actualizarNoticia(id, {
          titular: titular.value,
          resumen: resumen.value,
          completa: completa.value,

        });

        if (actualizarNoticia === true) {
          mensaje = 'ACTUALIZADO CON EXITO';
          if (mensaje !== undefined) {
            let mensajeError = mensaje;
            mensaje = undefined;
            console.log('EDITADO CON EXITO');
            res.render('editarNoticias', { mensajeError });
            location.reload();
          }
        }

        editStatus = false;
        id = "";
        formularioNoticias["btn-task-form"].innerText = "Actualizar";
      }
      alert('ACTUALIZADO CON EXITO');
      mensaje = 'ACTUALIZADO CON ÉXITO';
      location.onload();

      location.reload();
      containerNoticias.focus();
    } catch (error) {
      console.log(error);
      mensaje = 'NO SE PUDO ACTUALIZAR';
      if (mensaje !== undefined) {
        let mensajeError = mensaje;
        mensaje = undefined;
        res.render('editarNoticias', { mensajeError });
      }
    }
  });




});
