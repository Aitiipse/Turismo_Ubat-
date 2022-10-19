import { listar,guardarformulario, eliminarformulario, getTask, actualizarformulario, getatractivos, } from "./firebaseConfig.js";
  
  const formatractivos = document.getElementById("formularioatractivos");
  const formrespuesta = document.getElementById("formulario-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    listar((querySnapshot) => {
      formrespuesta.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const atractivo = doc.data();
  
        formrespuesta.innerHTML += `
        <article class= "card">
            <div class="word">
            <h3>${atractivo.nombre}   </h3>
            <h4>RUTA ${atractivo.ruta}</h4>
            <p>ACTIVIDADES ${atractivo.a1} ${atractivo.a2} ${atractivo.a3} ${atractivo.a4} ${atractivo.a5} ${atractivo.a6} ${atractivo.a7} ${atractivo.a8} ${atractivo.a9} ${atractivo.a10}</p>
            <p>DESCRIPCION ${atractivo.descripcion}</p>
       
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
            await eliminarformulario(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = formrespuesta.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const atractivo = doc.data();
            formatractivos["nombre"].value = atractivo.nombre;
            formatractivos["a1"].value = atractivo.a1;
            formatractivos["a2"].value = atractivo.a2;
            formatractivos["a3"].value = atractivo.a3;
            formatractivos["a4"].value = atractivo.a4;
            formatractivos["a5"].value = atractivo.a5;
            formatractivos["a6"].value = atractivo.a6;
            formatractivos["a7"].value = atractivo.a7;
            formatractivos["a8"].value = atractivo.a8;
            formatractivos["a9"].value = atractivo.a9;
            formatractivos["a10"].value = atractivo.a10;
            formatractivos["descripcion"].value = atractivo.descripcion;
            formatractivos["ruta"].value = atractivo.ruta;
  
            editStatus = true;
            id = doc.id;
            formatractivos["agregar"].innerText = "Actualizar";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  formatractivos.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const nombre=formularioatractivos["nombre"];
    
    const a1=formularioatractivos["a1"];
    const a2=formularioatractivos["a2"];
    const a3=formularioatractivos["a3"];
    const a4=formularioatractivos["a4"];
    const a5=formularioatractivos["a5"];
    const a6=formularioatractivos["a6"];
    const a7=formularioatractivos["a7"];
    const a8=formularioatractivos["a8"];
    const a9=formularioatractivos["a9"];
    const a10=formularioatractivos["a10"];
    const descripcion=formularioatractivos["descripcion"];
    const ruta=formularioatractivos["ruta"];

    
  
    try {
      if (!editStatus) {
        await guardarformulario(nombre.value, a1.value, a2.value, a3.value, a4.value, a5.value, a6.value, a7.value, a8.value, a9.value, a10.value, descripcion.value, ruta.value);
      } else {
        await actualizarformulario(id, {
          nombre: nombre.value,
          a1: a1.value,
          a2: a1.value,
          a3: a1.value,
          a4: a1.value,
          a5: a1.value,
          a6: a1.value,
          a7: a1.value,
          a8: a1.value,
          a9: a1.value,
          a10: a1.value,
          descripcion: descripcion.value,
          ruta: ruta.value,
        });
  
        editStatus = false;
        id = "";
        formatractivos["agregar"].innerText = "Agregar";
      }
  
      formatractivos.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });







