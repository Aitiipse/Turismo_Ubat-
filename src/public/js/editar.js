import { listarAtractivos, guardarAtractivo, eliminarAtractivo, getAtractivo, actualizarAtractivo, getAtractivos } from "./firebaseConfig.js";

const formularioAtractivos = document.getElementById("formularioeditar");
const containerAtractivos = document.getElementById("contenedor");
let mensaje = undefined;


let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  // ---------------------------------------------------ATRACTIVOS-----------------------------------------

  listarAtractivos((querySnapshot) => {
   

    querySnapshot.forEach((doc) => {
      const atractivo = doc.data();

      containerAtractivos.innerHTML += `

        <tr>
        <th>Atractivo</th>
        <th>Ruta</th>
        <th>Editar</th>
        <th>Eliminar</th>
      </tr>
      <tr>
        <td style="font-style: italic;">${atractivo.nombre} </td>
        <td>${atractivo.ruta}</td>
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

    const btnsDelete = containerAtractivos.getElementsByClassName("btn-delete");

    const deleteAtractivo = async (id) => {
      if (confirm('ESTA SEGURO QUE DESEA ELIMINAR?')) {
        try {
          await eliminarAtractivo(id);
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
        deleteAtractivo(id)
      )
    );
    

    const btnsEdit = containerAtractivos.querySelectorAll(".btn-edit");

    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        formularioAtractivos.addEventListener("submit", (event) => {
          event.preventDefault();
        
          // Limpiar los campos del formulario
          const campos = formularioAtractivos.querySelectorAll("input, textarea");
          campos.forEach((campo) => {
            campo.value = "";
          });
        
          // Resto del código...
        });


        try {
          const doc = await getAtractivo(e.target.dataset.id);
          const atractivo = doc.data();
          formularioAtractivos["nombre"].value = atractivo.nombre;
          formularioAtractivos["ruta"].value = atractivo.ruta;
          formularioAtractivos["horario"].value = atractivo.horario;
          formularioAtractivos["descripcion"].value = atractivo.descripcion;
          formularioAtractivos["street"].value = atractivo.street;
          if (atractivo.a1) {
            formularioAtractivos["a1"].checked = true;
            console.log(atractivo.a1)
          } if (atractivo.a2) {
            formularioAtractivos["a2"].checked = true;
            console.log(atractivo.a2)
          } if (atractivo.a3) {
            formularioAtractivos["a3"].checked = true;
            console.log(atractivo.a3)
          } if (atractivo.a4) {
            formularioAtractivos["a4"].checked = true;
            console.log(atractivo.a4)
          } if (atractivo.a5) {
            formularioAtractivos["a5"].checked = true;
            console.log(atractivo.a5)
          } if (atractivo.a6) {
            formularioAtractivos["a6"].checked = true;
            console.log(atractivo.a6)
          } if (atractivo.a7) {
            formularioAtractivos["a7"].checked = true;
            console.log(atractivo.a7)
          } if (atractivo.a8) {
            formularioAtractivos["a8"].checked = true;
            console.log(atractivo.a8)
          } if (atractivo.a9) {
            formularioAtractivos["a9"].checked = true;
            console.log(atractivo.a9)
          } if (atractivo.a10) {
            formularioAtractivos["a10"].checked = true;
            console.log(atractivo.a10)
          }


          editStatus = true;
          id = doc.id;
          formularioAtractivos["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });

  formularioAtractivos.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = formularioAtractivos["nombre"];
    const ruta = formularioAtractivos["ruta"];
    const horario = formularioAtractivos["horario"];
    const descripcion = formularioAtractivos["descripcion"];
    const street = formularioAtractivos["street"];
    const a1 = formularioAtractivos["a1"];
    const a2 = formularioAtractivos["a2"];
    const a3 = formularioAtractivos["a3"];
    const a4 = formularioAtractivos["a4"];
    const a5 = formularioAtractivos["a5"];
    const a6 = formularioAtractivos["a6"];
    const a7 = formularioAtractivos["a7"];
    const a8 = formularioAtractivos["a8"];
    const a9 = formularioAtractivos["a9"];
    const a10 = formularioAtractivos["a10"];

    try {
      if (!editStatus) {
        // await guardarAtractivo(nombre.value, ruta.value, descripcion.value, street.value, a1.value, a2.value, a3.value, a4.value, a5.value, a6.value, a7.value, a8.value, a9.value, a10.value);
      } else {
        await actualizarAtractivo(id, {
          nombre: nombre.value,
          ruta: ruta.value,
          horario: horario.value,
          descripcion: descripcion.value,
          street: street.value,
          a1: a1.value,
          a2: a2.value,
          a3: a3.value,
          a4: a4.value,
          a5: a5.value,
          a6: a6.value,
          a7: a7.value,
          a8: a8.value,
          a9: a9.value,
          a10: a10.value,
        });

        if (actualizarAtractivo === true) {
          mensaje = 'ACTUALIZADO CON EXITO';
          if (mensaje !== undefined) {
            let mensajeError = mensaje;
            mensaje = undefined;
            console.log('EDITADO CON EXITO');
            res.render('editarAtractivos', { mensajeError });
            location.reload();
          }
        }


        editStatus = false;
        id = "";
        formularioAtractivos["btn-task-form"].innerText = "Actualizar";
      }

      alert('ACTUALIZADO CON EXITO');
      mensaje = 'ACTUALIZADO CON ÉXITO';
      location.onload();
      formularioAtractivos.reset();

      location.reload();
      containerAtractivos.focus();
    } catch (error) {
      alert('NO SE PUDO ACTUALIZAR');
      console.log(error);
    }
  });




});


