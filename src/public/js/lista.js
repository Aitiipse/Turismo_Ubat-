import { listarlista, getAtractivolista } from "./firebaseConfig.js";

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



          const regex = /^<iframe\s+src="https:\/\/www\.google\.com\/maps\/embed\?.*?"\s+width="\d+"\s+height="\d+"\s+style="border:0;"\s+allowfullscreen=""\s+loading="lazy"\s+referrerpolicy="no-referrer-when-downgrade"><\/iframe>$/

          const str = actual.street;

          if (regex.test(str)) {

            const html = actual.street;
          const urlRegex = /src="([^"]*)"/; // Expresión regular que busca el texto dentro de src=""
          const urlMatch = html.match(urlRegex); // Ejecuta la expresión regular en el código HTML y devuelve un array con la coincidencia

          if (urlMatch && urlMatch[1]) { // Comprueba que haya una coincidencia y que exista el índice 1 del array (que contiene la URL)
            const url = urlMatch[1]; // Asigna la URL a una variable
            console.log(url); // Imprime la URL en la consola

            sectionlista.querySelector("#street").src = url;
            sectionlista.querySelector(".streetviewlis").style.display = "block";
          }

            console.log('La cadena cumple con la estructura de un iframe de Google Maps.');
          } else {
            sectionlista.querySelector(".streetviewlis").style.display = "none";

          }


          
        } catch (error) {
          console.log(error);
          console.log("no llega");
        }
      });
    });
  });





});

