import { getAtractivo, getAtractivos, listar, listarAtractivos, listarsitios1, listarsitios2, listarsitios3, listarsitios4, listarsitios5, listarNoticia, listarNoticias, listarRutas, getNoticia, listarRutasFront } from "./firebaseConfig.js";

const formrespuesta = document.getElementById("formulario-container");
var span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("modal");
const modaln = document.getElementById("modaln");
const formsitios1 = document.getElementById("sitios-container1");
const formsitios2 = document.getElementById("sitios-container2");
const formsitios3 = document.getElementById("sitios-container3");
const formsitios4 = document.getElementById("sitios-container4");
const formsitios5 = document.getElementById("sitios-container5");
// const formlista = document.getElementById("lista");
// const sectionlista = document.getElementById("sectionlista");
const formrespuestan = document.getElementById("formulario-noticias");
const formrespuestanes = document.getElementById("espacio-noticias");
const formrespuestaruta = document.getElementById("formulario-rutas");
const textoruta = document.getElementById("textoruta");



let editStatus = false;
let id = "";


let nombre = document.querySelectorAll(".nombre")[0];
let input0 = document.querySelectorAll(".input0")[0];


window.addEventListener("DOMContentLoaded", async (e) => {
    listar((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const atractivo = doc.data();
  
        formrespuesta.innerHTML += `
        <br>
          <div class="card3-sm card3-md card3-lg  card3-2 card3-xl card3-xxl atracmodal">
          
            <button class="btn_name btn-secondary btn-modal" id="btn_name" type="" data-id="${doc.id}">
              ${atractivo.nombre}
            </button>
            <div class="imgcard3" style="object-fit: contain; background-image: url(${atractivo.input0});" data-id="${doc.id}">
            </div>
          </div>
        `;
      });
  
      const btnsModal = formrespuesta.querySelectorAll(".imgcard3");
      btnsModal.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          console.log("llega aca");
  
          try {
            const doc = await getAtractivo(e.target.dataset.id);
            const task = doc.data();
            modal.style.display = "block";
            modal["nombre"].value = task.nombre;
            modal["descripcion"].value = task.descripcion;
            modal["ruta"].value = task.ruta;
            modal["updatedAt"].value = task.updatedAt;
            modal["iframe"].src = task.input0;
            const botonAtractivo = document.getElementById("botonatractivo");
            botonAtractivo.href = "/lista?atractivoId=" + doc.id;
  
            console.log(doc.id);
          } catch (error) {
            console.log(error);
          }
        });
      });
  
      span.onclick = function () {
        modal.style.display = "none";
      };
  
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  
  

  listarAtractivos((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      const atractivo = doc.data();

      formlista.innerHTML += `
        


      <div class="cardlisp"  style=" background-image:url(${atractivo.input0});" data-id="${doc.id}" >
      <p class="cardlis-title">${atractivo.nombre}
      </p>
      </div>
  
      `;
    });

    const btnlista = formrespuesta.querySelectorAll(".cardlis");
    btnlista.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        console.log('click');

        try {
          const doc = await getAtractivos(e.target.dataset.id);
          const actual = doc.data();
          sectionlista.style.display = "block";
          sectionlista["nombre"].value = actual.nombre;
          sectionlista["actividades"].src = actual.actividades;
          sectionlista["descripcion"].value = actual.descripcion;
          sectionlista["ruta"].value = actual.ruta;

        } catch (error) {
          console.log(error);
        }
      });
    });
  });


  listarNoticia((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      const noticia = doc.data();
      formrespuestanes.innerHTML += `
        <div class=" centrado-content-align cardnoticias " style="  background-image: url(${noticia.url});">
            <div class=""></div>
            <div class="cardnoticias-content centrado-content-align flex">
              <div class="title">
              <b> ${noticia.titular}  </b>
              </div><br>
              <div class="description">${noticia.completa}</div>
            </div>
          </div>
          
          
      `;
    });



  });


  listarNoticias((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      const noticia = doc.data();
      formrespuestan.innerHTML += `
      <div class=" centrado-content-align cardnoticias " >
          <div class=""></div>
          <div class="cardnoticias-content centrado-content-align flex">
            <div class="title">
            <b> ${noticia.titular}  </b>
            </div><br>
            <div class="description">${noticia.resumen}</div>
          </div>
        </div>
        
        
    

    `;
    });




  });



  listarRutas((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      const rut = doc.data();
      let clase;
      switch (rut.ruta) {
        case "Siguiendo los pasos Ebatenses":
          clase = "fruta1";
          break;
        case "Sabores y saberes":
          clase = "fruta2";
          break;
        case "Promeseros y Romeros":
          clase = "fruta3";
          break;
        case "Naturaleza":
          clase = "fruta4";
          break;
        case "Biciturismo":
          clase = "fruta5";
          break;
        default:
          clase = "";
      }
      formrespuestaruta.innerHTML += `
          <div class="ruta-admin card-n ${clase}">
            <article class= "con-text">
              <h5><b>${rut.ruta}</b></h5>
              <h6>${rut.info}</h6>
            </article>
          </div>
        `;
    });
  });
  


  listarRutasFront((querySnapshot) => {
    const textoruta = document.getElementById('textoruta'); // Obtén el elemento HTML
    const urlActual = location.pathname;
    const identificador = urlActual.substring(urlActual.lastIndexOf('/') + 1);
    
    querySnapshot.forEach((doc) => {
      const rut = doc.data();
      
      if (rut.url === identificador) {
        // Si el identificador coincide, muestra el campo de texto correspondiente al identificador
        textoruta.innerHTML += `<p>${rut.info}</p>`;
        return; // Sal del loop, ya que encontraste el identificador coincidente
      }
    });
  });
  

  
  listarsitios1((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const atractivo = doc.data();
  
      if (atractivo.ruta === "Cultura e Historia") {
        const cardHTML = `
          <br>
          <div class="card3-sm card3-md card3-lg  card3-2 card3-xl card3-xxl atracmodal abc">
            <button class="btn_name btn-secondary btn-modal" id="btn_name" type="" data-id="${doc.id}">
              ${atractivo.nombre}
            </button>
            <div class="imgcard3 abc" style="object-fit: contain; background-image: url(${atractivo.input0});" data-id="${doc.id}">
            </div>
          </div>
        `;
  
        formsitios1.insertAdjacentHTML("beforeend", cardHTML);
  
        const card3 = formsitios1.lastElementChild.querySelector(".imgcard3");
        const card4 = formsitios1.lastElementChild.querySelector(".card4");
        card3.addEventListener("click", (event) => {
          card4.style.display = "block";
          event.stopPropagation();
        });
      }
  
      const btnsModal = formsitios1.querySelectorAll(".abc");
      btnsModal.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getAtractivo(e.target.dataset.id);
            const task = doc.data();
            modal.style.display = "block";
  
            // Renderizar los datos en el formulario modal
            modal.querySelector("#nombre").textContent = task.nombre;
            modal.querySelector("#descripcion").textContent = task.descripcion;
            modal.querySelector("#ruta").textContent = task.ruta;
            modal.querySelector("#updatedAt").textContent = task.updatedAt;
            modal.querySelector("#iframe").src = task.input0;
            const botonAtractivo = document.getElementById("botonatractivo");
            botonAtractivo.href = "/lista?atractivoId=" + doc.id;
          } catch (error) {
            console.log(error);
          }
        });
      });
  
      span.onclick = function () {
        modal.style.display = "none";
      };
  
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  });

  listarsitios2((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const atractivo = doc.data();
  
      if (atractivo.ruta === "Gastronómico") {
        const cardHTML = `
          <br>
          <div class="card3-sm card3-md card3-lg  card3-2 card3-xl card3-xxl atracmodal abc">
            <button class="btn_name btn-secondary btn-modal" id="btn_name" type="" data-id="${doc.id}">
              ${atractivo.nombre}
            </button>
            <div class="imgcard3 abc" style="object-fit: contain; background-image: url(${atractivo.input0});" data-id="${doc.id}">
            </div>
          </div>
        `;
  
        formsitios2.insertAdjacentHTML("beforeend", cardHTML);
  
        const card3 = formsitios2.lastElementChild.querySelector(".imgcard3");
        const card4 = formsitios2.lastElementChild.querySelector(".card4");
        card3.addEventListener("click", (event) => {
          card4.style.display = "block";
          event.stopPropagation();
        });
      }
  
      const btnsModal = formsitios2.querySelectorAll(".abc");
      btnsModal.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getAtractivo(e.target.dataset.id);
            const task = doc.data();
            modal.style.display = "block";
  
            // Renderizar los datos en el formulario modal
            modal.querySelector("#nombre").textContent = task.nombre;
            modal.querySelector("#descripcion").textContent = task.descripcion;
            modal.querySelector("#ruta").textContent = task.ruta;
            modal.querySelector("#updatedAt").textContent = task.updatedAt;
            modal.querySelector("#iframe").src = task.input0;
            const botonAtractivo = document.getElementById("botonatractivo");
            botonAtractivo.href = "/lista?atractivoId=" + doc.id;
          } catch (error) {
            console.log(error);
          }
        });
      });
  
      span.onclick = function () {
        modal.style.display = "none";
      };
  
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  });
  
  listarsitios3((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const atractivo = doc.data();
  
      if (atractivo.ruta === "Religioso") {
        const cardHTML = `
          <br>
          <div class="card3-sm card3-md card3-lg  card3-2 card3-xl card3-xxl atracmodal abc">
            <button class="btn_name btn-secondary btn-modal" id="btn_name" type="" data-id="${doc.id}">
              ${atractivo.nombre}
            </button>
            <div class="imgcard3 abc" style="object-fit: contain; background-image: url(${atractivo.input0});" data-id="${doc.id}">
            </div>
          </div>
        `;
  
        formsitios3.insertAdjacentHTML("beforeend", cardHTML);
  
        const card3 = formsitios3.lastElementChild.querySelector(".imgcard3");
        const card4 = formsitios3.lastElementChild.querySelector(".card4");
        card3.addEventListener("click", (event) => {
          card4.style.display = "block";
          event.stopPropagation();
        });
      }
  
      const btnsModal = formsitios3.querySelectorAll(".abc");
      btnsModal.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getAtractivo(e.target.dataset.id);
            const task = doc.data();
            modal.style.display = "block";
  
            // Renderizar los datos en el formulario modal
            modal.querySelector("#nombre").textContent = task.nombre;
            modal.querySelector("#descripcion").textContent = task.descripcion;
            modal.querySelector("#ruta").textContent = task.ruta;
            modal.querySelector("#updatedAt").textContent = task.updatedAt;
            modal.querySelector("#iframe").src = task.input0;
            const botonAtractivo = document.getElementById("botonatractivo");
            botonAtractivo.href = "/lista?atractivoId=" + doc.id;
          } catch (error) {
            console.log(error);
          }
        });
      });
  
      span.onclick = function () {
        modal.style.display = "none";
      };
  
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  });

  listarsitios4((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const atractivo = doc.data();
  
      if (atractivo.ruta === "Naturaleza") {
        const cardHTML = `
          <br>
          <div class="card3-sm card3-md card3-lg  card3-2 card3-xl card3-xxl atracmodal abc">
            <button class="btn_name btn-secondary btn-modal" id="btn_name" type="" data-id="${doc.id}">
              ${atractivo.nombre}
            </button>
            <div class="imgcard3 abc" style="object-fit: contain; background-image: url(${atractivo.input0});" data-id="${doc.id}">
            </div>
          </div>
        `;
  
        formsitios4.insertAdjacentHTML("beforeend", cardHTML);
  
        const card3 = formsitios4.lastElementChild.querySelector(".imgcard3");
        const card4 = formsitios4.lastElementChild.querySelector(".card4");
        card3.addEventListener("click", (event) => {
          card4.style.display = "block";
          event.stopPropagation();
        });
      }
  
      const btnsModal = formsitios4.querySelectorAll(".abc");
      btnsModal.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getAtractivo(e.target.dataset.id);
            const task = doc.data();
            modal.style.display = "block";
  
            // Renderizar los datos en el formulario modal
            modal.querySelector("#nombre").textContent = task.nombre;
            modal.querySelector("#descripcion").textContent = task.descripcion;
            modal.querySelector("#ruta").textContent = task.ruta;
            modal.querySelector("#updatedAt").textContent = task.updatedAt;
            modal.querySelector("#iframe").src = task.input0;
            const botonAtractivo = document.getElementById("botonatractivo");
            botonAtractivo.href = "/lista?atractivoId=" + doc.id;
          } catch (error) {
            console.log(error);
          }
        });
      });
  
      span.onclick = function () {
        modal.style.display = "none";
      };
  
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  });

  listarsitios5((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const atractivo = doc.data();
  
      if (atractivo.ruta === "Deportivo") {
        const cardHTML = `
          <br>
          <div class="card3-sm card3-md card3-lg  card3-2 card3-xl card3-xxl atracmodal abc">
            <button class="btn_name btn-secondary btn-modal" id="btn_name" type="" data-id="${doc.id}">
              ${atractivo.nombre}
            </button>
            <div class="imgcard3 abc" style="object-fit: contain; background-image: url(${atractivo.input0});" data-id="${doc.id}">
            </div>
          </div>
        `;
  
        formsitios5.insertAdjacentHTML("beforeend", cardHTML);
  
        const card3 = formsitios5.lastElementChild.querySelector(".imgcard3");
        const card4 = formsitios5.lastElementChild.querySelector(".card4");
        card3.addEventListener("click", (event) => {
          card4.style.display = "block";
          event.stopPropagation();
        });
      }
  
      const btnsModal = formsitios5.querySelectorAll(".abc");
      btnsModal.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getAtractivo(e.target.dataset.id);
            const task = doc.data();
            modal.style.display = "block";
  
            // Renderizar los datos en el formulario modal
            modal.querySelector("#nombre").textContent = task.nombre;
            modal.querySelector("#descripcion").textContent = task.descripcion;
            modal.querySelector("#ruta").textContent = task.ruta;
            modal.querySelector("#updatedAt").textContent = task.updatedAt;
            modal.querySelector("#iframe").src = task.input0;
            const botonAtractivo = document.getElementById("botonatractivo");
            botonAtractivo.href = "/lista?atractivoId=" + doc.id;
          } catch (error) {
            console.log(error);
          }
        });
      });
  
      span.onclick = function () {
        modal.style.display = "none";
      };
  
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  });

  

});

