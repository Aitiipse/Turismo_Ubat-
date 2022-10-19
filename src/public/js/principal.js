import { listar, listarnoticia } from "./firebaseConfig.js";
  
  const formatractivos = document.getElementById("formularioatractivos");
  const formrespuesta = document.getElementById("formulario-container");
  const formrespuestan = document.getElementById("formulario-noticias");
  
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
        <div class="card-a">
        <article class= "con-text">
            <h5>${atractivo.nombre}   </h5>
            <h6>RUTA ${atractivo.ruta}</h6>
            <h6>ACTIVIDADES ${atractivo.a1} ${atractivo.a2} ${atractivo.a3} ${atractivo.a4} ${atractivo.a5} ${atractivo.a6} ${atractivo.a7} ${atractivo.a8} ${atractivo.a9} ${atractivo.a10}</h6>
            <h6>DESCRIPCION ${atractivo.descripcion}</h6>
        </article>
        </div>
      `;
      });
  
     
  
     
    });
  
  });

  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getnoticias();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    listarnoticia((querySnapshot) => {
      formrespuestan.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const noticia = doc.data();
  
        formrespuestan.innerHTML += `
        <div class="card-n">
        <article class= "con-text">
            
            <h5>${noticia.titular}   </h5>
            <h6>RESUMEN ${noticia.resumen}</h6>
            <h6>COMPLETA ${noticia.completa} </h6>
            <h6>LINK ${noticia.link}</h6>
            </article>
            </div>
      `;
      });   
  });
});

