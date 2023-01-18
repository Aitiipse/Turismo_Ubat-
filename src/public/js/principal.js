import { listar,listarsitios1,listarsitios2,listarsitios3,listarsitios4,listarsitios5, listarnoticia, listarruta } from "./firebaseConfig.js";
  
  const formrespuesta = document.getElementById("formulario-container");
  const formsitios1 = document.getElementById("sitios-container1");
  const formsitios2 = document.getElementById("sitios-container2");
  const formsitios3 = document.getElementById("sitios-container3");
  const formsitios4 = document.getElementById("sitios-container4");
  const formsitios5 = document.getElementById("sitios-container5");
  const formrespuestan = document.getElementById("formulario-noticias");
  const formrespuestaruta = document.getElementById("formulario-rutas");
  
  
  let editStatus = false;
  let id = "";
  

let nombre = document.querySelectorAll(".nombre")[0];
let input0 = document.querySelectorAll(".input0")[0];

  
  window.addEventListener("DOMContentLoaded", async (e) => {
    listar((querySnapshot) => {
     
      querySnapshot.forEach((doc) => {
        const atractivo = doc.data();
        var nombre = atractivo.nombre;
        var input0 = atractivo.input0;
        
        formrespuesta.innerHTML += `

        <div class="card3" >
        <div class="imgcard3 "  style=" background-image: url(${atractivo.input0});"   >
        
        <div class="nombre">
            <a><b>${atractivo.nombre} </b> </a>
            </div></div>
             
            <div class="card4" style=" background-image: url(${atractivo.input0});" display="none"   >
            <div class="to-contents"  onclick="document.querySelector('.modal1').classList.remove('expand');event.stopPropagation();">
               <a><b>${atractivo.nombre} </b> </a>
              <div class="top">
                 <a><b>${atractivo.ruta} </b> </a>
                <div class="name-large"> </div>
                 <a><b>${atractivo.descripcion} </b> </a>
              </div>
            </div>
          <script>
          document.getElementById("card3").addEventListener("click", myFunction);

function myFunction() {
  document.getElementById("card4").style.visible="visible";
}
          </script>
      `;
      });
    });

    

    listarnoticia((querySnapshot) => {
      formrespuestan.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const noticia = doc.data();
        formrespuestan.innerHTML += `
        <div class="card-n" style="  background-image: url(${noticia.url});">
        <article class= "con-text">
            <h5>${noticia.titular}   </h5>
            <h6>RESUMEN ${noticia.resumen}</h6>
            <p>FECHA ${noticia.updatedAt}</p>
            </article>
            </div>
      `;
      });   
  });



  listarruta((querySnapshot) => {
    formrespuestaruta.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const rut = doc.data();
      formrespuestaruta.innerHTML += `
      <div class="card-n">
      <article class= "con-text">
          <h5>${rut.ruta}   </h5>
          <h6>RESUMEN ${rut.info}</h6>
          </article>
          </div>
    `;
    });   
});

listarsitios1((querySnapshot) => {
     
  querySnapshot.forEach((doc) => {
    const atractivo = doc.data();

    if(atractivo.ruta == "Cultura e Historia"){
    
    formsitios1.innerHTML += `

    <div class="card5" >
    <div class="imgcard3 "  style=" background-image: url(${atractivo.input0});"   >
    
    <div class="nombresitios">
        <a><b>${atractivo.nombre} </b> </a>
        </div></div>
         
        <div class="card4" style=" background-image: url(${atractivo.input0});" display="none"   >
        <div class="to-contents"  onclick="document.querySelector('.modal1').classList.remove('expand');event.stopPropagation();">
           <a><b>${atractivo.nombre} </b> </a>
          <div class="top">
             <a><b>${atractivo.ruta} </b> </a>
            <div class="name-large"> </div>
             <a><b>${atractivo.descripcion} </b> </a>
          </div>
        </div>
      <script>
      document.getElementById("card3").addEventListener("click", myFunction);

function myFunction() {
document.getElementById("card4").style.visible="visible";
}
      </script>
  `;
}});
});

listarsitios2((querySnapshot) => {
     
  querySnapshot.forEach((doc) => {
    const atractivo = doc.data();

    if(atractivo.ruta == "Gastronómico"){
    
    formsitios2.innerHTML += `

    <div class="card5" >
    <div class="imgcard3 "  style=" background-image: url(${atractivo.input0});"   >
    
    <div class="nombresitios">
        <a><b>${atractivo.nombre} </b> </a>
        </div></div>
         
        <div class="card4" style=" background-image: url(${atractivo.input0});" display="none"   >
        <div class="to-contents"  onclick="document.querySelector('.modal1').classList.remove('expand');event.stopPropagation();">
           <a><b>${atractivo.nombre} </b> </a>
          <div class="top">
             <a><b>${atractivo.ruta} </b> </a>
            <div class="name-large"> </div>
             <a><b>${atractivo.descripcion} </b> </a>
          </div>
        </div>
      <script>
      document.getElementById("card3").addEventListener("click", myFunction);

function myFunction() {
document.getElementById("card4").style.visible="visible";
}
      </script>
  `;
}});
});

listarsitios3((querySnapshot) => {
     
  querySnapshot.forEach((doc) => {
    const atractivo = doc.data();

    if(atractivo.ruta == "Religioso"){
    
    formsitios3.innerHTML += `

    <div class="card5" >
    <div class="imgcard3 "  style=" background-image: url(${atractivo.input0});"   >
    
    <div class="nombresitios">
        <a><b>${atractivo.nombre} </b> </a>
        </div></div>
         
        <div class="card4" style=" background-image: url(${atractivo.input0});" display="none"   >
        <div class="to-contents"  onclick="document.querySelector('.modal1').classList.remove('expand');event.stopPropagation();">
           <a><b>${atractivo.nombre} </b> </a>
          <div class="top">
             <a><b>${atractivo.ruta} </b> </a>
            <div class="name-large"> </div>
             <a><b>${atractivo.descripcion} </b> </a>
          </div>
        </div>
      <script>
      document.getElementById("card3").addEventListener("click", myFunction);

function myFunction() {
document.getElementById("card4").style.visible="visible";
}
      </script>
  `;
}});
});

listarsitios4((querySnapshot) => {
     
  querySnapshot.forEach((doc) => {
    const atractivo = doc.data();

    if(atractivo.ruta == "Naturaleza"){
    
    formsitios4.innerHTML += `

    <div class="card5" >
    <div class="imgcard3 "  style=" background-image: url(${atractivo.input0});"   >
    
    <div class="nombresitios">
        <a><b>${atractivo.nombre} </b> </a>
        </div></div>
         
        <div class="card4" style=" background-image: url(${atractivo.input0});" display="none"   >
        <div class="to-contents"  onclick="document.querySelector('.modal1').classList.remove('expand');event.stopPropagation();">
           <a><b>${atractivo.nombre} </b> </a>
          <div class="top">
             <a><b>${atractivo.ruta} </b> </a>
            <div class="name-large"> </div>
             <a><b>${atractivo.descripcion} </b> </a>
          </div>
        </div>
      <script>
      document.getElementById("card3").addEventListener("click", myFunction);

function myFunction() {
document.getElementById("card4").style.visible="visible";
}
      </script>
  `;
}});
});

listarsitios5((querySnapshot) => {
     
  querySnapshot.forEach((doc) => {
    const atractivo = doc.data();

    if(atractivo.ruta == "Deportivo"){
    
    formsitios5.innerHTML += `

    <div class="card5" >
    <div class="imgcard3 "  style=" background-image: url(${atractivo.input0});"   >
    
    <div class="nombresitios">
        <a><b>${atractivo.nombre} </b> </a>
        </div></div>
         
        <div class="card4" style=" background-image: url(${atractivo.input0});" display="none"   >
        <div class="to-contents"  onclick="document.querySelector('.modal1').classList.remove('expand');event.stopPropagation();">
           <a><b>${atractivo.nombre} </b> </a>
          <div class="top">
             <a><b>${atractivo.ruta} </b> </a>
            <div class="name-large"> </div>
             <a><b>${atractivo.descripcion} </b> </a>
          </div>
        </div>
      <script>
      document.getElementById("card3").addEventListener("click", myFunction);

function myFunction() {
document.getElementById("card4").style.visible="visible";
}
      </script>
  `;
}});
});



});

