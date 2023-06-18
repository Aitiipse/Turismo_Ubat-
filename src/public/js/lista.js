import { listarlista, getAtractivolista } from "./firebaseConfig.js";

const formlista = document.getElementById("lista");
const sectionlista = document.getElementById("sectionlista");


window.addEventListener("DOMContentLoaded", async (e) => {



    listarlista((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const atractivo = doc.data();
  
        formlista.innerHTML += `
          <div class="cardlisp" style="background-image:url(${atractivo.input0});" data-id="${doc.id}">
            <p class="cardlis-title" data-id="${doc.id}">${atractivo.nombre}</p>
          </div>
        `;
      });
  
      const btnlista = formlista.querySelectorAll(".cardlisp");
      btnlista.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          console.log("llega aca");
  
          try {
            const doc = await getAtractivolista(e.target.dataset.id);
            const actual = doc.data();
            sectionlista.style.display = "block";
            sectionlista["nombre"].value = actual.nombre;
            sectionlista.querySelector(".imglista").style.backgroundImage = `url(${actual.input0})`;
            sectionlista["descripcion"].value = actual.descripcion;
            sectionlista["ruta"].value = `pertenece a la ruta ${actual.ruta}.`;
  
            // Resto del código para asignar los valores a los elementos del formulario...
  
          } catch (error) {
            console.log(error);
            console.log("no llega");
          }
        });
      });
  
      // Obtener el atractivoId de la URL
      const urlParams = new URLSearchParams(window.location.search);
      const atractivoId = urlParams.get("atractivoId");
  
      // Buscar el elemento con el data-id igual al atractivoId de la URL y hacer clic en él
      const element = document.querySelector(`.cardlisp[data-id="${atractivoId}"]`);
      if (element) {
        element.click();
      }
    });
  });
  






