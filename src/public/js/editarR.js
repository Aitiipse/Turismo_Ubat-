import { listarRutas, guardarRuta, eliminarRuta, getRuta, actualizarRuta, getRutas } from "./firebaseConfig.js";

const formularioRutas = document.getElementById("formularioR");
const containerRuta = document.getElementById("contenedorR");


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
          const doc = await getRuta(e.target.dataset.id);
          const Ruta = doc.data();
          formularioRutas["nombre"].value = Ruta.nombre;
          formularioRutas["ruta"].value = Ruta.ruta;
          formularioRutas["descripcion"].value = Ruta.descripcion;
          formularioRutas["street"].value = Ruta.street;
          if (Ruta.a1) {
            formularioRutas["a1"].checked = true;
            console.log(Ruta.a1)
          } if (Ruta.a2) {
            formularioRutas["a2"].checked = true;
            console.log(Ruta.a2)
          } if (Ruta.a3) {
            formularioRutas["a3"].checked = true;
            console.log(Ruta.a3)
          } if (Ruta.a4) {
            formularioRutas["a4"].checked = true;
            console.log(Ruta.a4)
          } if (Ruta.a5) {
            formularioRutas["a5"].checked = true;
            console.log(Ruta.a5)
          } if (Ruta.a6) {
            formularioRutas["a6"].checked = true;
            console.log(Ruta.a6)
          } if (Ruta.a7) {
            formularioRutas["a7"].checked = true;
            console.log(Ruta.a7)
          } if (Ruta.a8) {
            formularioRutas["a8"].checked = true;
            console.log(Ruta.a8)
          } if (Ruta.a9) {
            formularioRutas["a9"].checked = true;
            console.log(Ruta.a9)
          } if (Ruta.a10) {
            formularioRutas["a10"].checked = true;
            console.log(Ruta.a10)
          }


          editStatus = true;
          id = doc.id;
          formularioRutas["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });

  formularioRutas.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = formularioRutas["nombre"];
    const ruta = formularioRutas["ruta"];
    const descripcion = formularioRutas["descripcion"];
    const street = formularioRutas["street"];
    const a1 = formularioRutas["a1"];
    const a2 = formularioRutas["a2"];
    const a3 = formularioRutas["a3"];
    const a4 = formularioRutas["a4"];
    const a5 = formularioRutas["a5"];
    const a6 = formularioRutas["a6"];
    const a7 = formularioRutas["a7"];
    const a8 = formularioRutas["a8"];
    const a9 = formularioRutas["a9"];
    const a10 = formularioRutas["a10"];

    try {
      if (!editStatus) {
        // await guardarRuta(nombre.value, ruta.value, descripcion.value, street.value, a1.value, a2.value, a3.value, a4.value, a5.value, a6.value, a7.value, a8.value, a9.value, a10.value);
      } else {
        await actualizarRuta(id, {
          nombre: nombre.value,
          ruta: ruta.value,
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

        editStatus = false;
        id = "";
        formularioRutas["btn-task-form"].innerText = "Actualizar";
      }

      formularioRutas.reset();
      nombre.focus();
    } catch (error) {
      console.log(error);
    }
  });




});


