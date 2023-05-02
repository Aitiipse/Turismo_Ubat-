import { listarRutas, guardarRuta, eliminarRuta, getRuta, actualizarRuta, getRutas } from "./firebaseConfig.js";

const formularioRutas = document.getElementById("formulario");
const containerRuta = document.getElementById("contenedorR");
let mensaje = undefined;


let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  // ---------------------------------------------------RutaS-----------------------------------------

  listarRutas((querySnapshot) => {
    containerRuta.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const ruta = doc.data();

      containerRuta.innerHTML += `

        <tr>
        <th>Ruta</th>
        <th>info</th>
        <th>Editar</th>
        <th>Eliminar</th>
      </tr>
      <tr>
        <td style="font-style: italic;">${ruta.ruta} </td>
        <td>${ruta.info}</td>
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

    const btnsDelete = containerRuta.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await eliminarRuta(dataset.id);
        
        } catch (error) {
          console.log(error);
         
        }
      })
    );

    const btnsEdit = containerRuta.querySelectorAll(".btn-edit");

    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        formularioRutas.reset();
        
        try {
          const listaVer = document.getElementById("formularioR");
          const doc = await getRuta(e.target.dataset.id);
          const Ruta = doc.data();
          const formulario = document.getElementById("formulario");
          const nombre = document.getElementById("nombre");
          const descripcion = document.getElementById("descripcion");
          const btnguardar = document.getElementById("btn-task-form");
          listaVer.style.display = "none";
          formulario.style.display = "block";
          btnguardar.style.display = "block";
          formularioRutas["nombre"].value = Ruta.ruta;
          formularioRutas["descripcion"].value = Ruta.info;
          document.getElementById("ver").innerHTML = "VER TODAS";

          editStatus = true;
          id = doc.id;
          // containerRuta.style.display = "none";

          formularioRutas["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });

  formularioRutas.addEventListener("submit", async (e) => {
    e.preventDefault();

    let nombre = formularioRutas["nombre"];
    let descripcion = formularioRutas["descripcion"];

    try {
      if (!editStatus) {
        // await guardarRuta(nombre.value, ruta.value, descripcion.value, street.value, a1.value, a2.value, a3.value, a4.value, a5.value, a6.value, a7.value, a8.value, a9.value, a10.value);
      } else {
        await actualizarRuta(id, {
          ruta: nombre.value,
          info: descripcion.value,
          
        })
        mensaje = 'ACTUALIZADO CON EXITO'
        if (mensaje !== undefined) {
          let mensajeError = mensaje;
          mensaje = undefined;
          console.log('editado con exito')
          res.render('editarruta', { mensajeError });};

        editStatus = false;
        id = "";
        formularioRutas["btn-task-form"].innerText = "Actualizar";
      }
      location.reload()
      formularioRutas.reset();
      nombre.focus();
    } catch (error) {
      console.log(error);
      mensaje = 'NO SE PUDO ACTUALIZAR'
      if (mensaje !== undefined) {
        let mensajeError = mensaje;
        mensaje = undefined;
        res.render('editarruta', { mensajeError });};
    }
  });




});


