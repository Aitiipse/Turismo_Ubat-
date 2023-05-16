import {  listarlista, getAtractivolista  } from "./firebaseConfig.js";

const formlista = document.getElementById("lista");
const sectionlista = document.getElementById("sectionlista");


window.addEventListener("DOMContentLoaded", async (e) => {
 


  listarlista((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      const atractivo = doc.data();

      formlista.innerHTML += `
        
      <div class="cardlis">
      <p class="cardlisp" style=" background-image:url(${atractivo.input0});" data-id="${doc.id}" >${atractivo.nombre}
      </p>
      </div>
  
      `;
      console.log("llega a mostrar");
      
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
          sectionlista.querySelector(".imglis").value = actual.street;

          
          
        } catch (error) {
          console.log(error);
          console.log("no llega");
        }
      });
    });
  });





  });

