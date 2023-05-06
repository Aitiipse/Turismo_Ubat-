import { getAtractivo, listar, listarAtractivos ,listarsitios1,listarsitios2,listarsitios3,listarsitios4,listarsitios5, listarNoticia, listarNoticias, listarRutas, getNoticia } from "./firebaseConfig.js";
  
  const formrespuesta = document.getElementById("formulario-container");
  var span = document.getElementsByClassName("close")[0];
  const modal = document.getElementById("modal");
  const modaln = document.getElementById("modaln");
  const formsitios1 = document.getElementById("sitios-container1");
  const formsitios2 = document.getElementById("sitios-container2");
  const formsitios3 = document.getElementById("sitios-container3");
  const formsitios4 = document.getElementById("sitios-container4");
  const formsitios5 = document.getElementById("sitios-container5");
  const formlista = document.getElementById("lista");
  const formrespuestan = document.getElementById("formulario-noticias");
  const formrespuestanes = document.getElementById("espacio-noticias");
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

        <div class="card3-sm card3-md card3-lg  card3-2 card3-xl card3-xxl " >
        <div class="imgcard3 "  style=" background-image: url(${atractivo.input0});"   >
        
        
            <button  class="tn btn-secondary btn-modal" data-id="${doc.id}">
          ${atractivo.nombre} </button>
            </div>
             
            
            </div>
      `;
       });
      
    const btnsModal = formrespuesta.querySelectorAll(".btn-modal");
    btnsModal.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getAtractivo(e.target.dataset.id);
          const task = doc.data();
          modal.style.display="block";
          modal["nombre"].value = task.nombre;
          modal["descripcion"].value = task.descripcion;
          modal["ruta"].value = task.ruta;
          modal["updatedAt"].value = task.updatedAt;
          modal["iframe"].src = task.input0;
         
          
          // formularioAtractivos["task-title"].value = task.nombre;
          // formularioAtractivos["task-description"].value = task.ruta;

          // editStatus = true;
          // id = doc.id;
          // formularioAtractivos["btn-task-form"].innerText = "modal";
        } catch (error) {
          console.log(error);
        }
      });
    });
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
      });
    

    listarAtractivos((querySnapshot) => {
     
      querySnapshot.forEach((doc) => {
        const atractivo = doc.data();
        
        formlista.innerHTML += `

        <div class="lista-item" >
                <div class="" >
                <div class="">
            <a><b><h4>${atractivo.nombre} </h4></b> </a>
            
                  <div class="street ">  <p class="texto">${atractivo.descripcion} 
                    </p><b>${atractivo.ruta}</b></div>
                    <section class="cstreet" style=" background-image: url(${atractivo.input0});" >
                    <div class="streetview"   >          
                </div>
                    <div class="streetview" >          
                    ${atractivo.street} 
                </div>
                </section>
                
            </div><br><br>
        </div>
</div>
  
      `;
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
            <b> ${noticia.titular} : : : >> </b>
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

   
   

    listarsitios1((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const atractivo = doc.data();
    
        if (atractivo.ruta === "Cultura e Historia") {
          const cardHTML = `
            <div class="card5">
              <div class="imgcard3" style="background-image: url(${atractivo.input0});">
                <div class="nombresitios">
                  <a><b>${atractivo.nombre}</b></a>
                </div>
              </div>
    
              <div class="card4" style="background-image: url(${atractivo.input0}); display: none;">
                <div class="to-contents">
                  <a><b>${atractivo.nombre}</b></a>
                  <div class="top">
                    <a><b>${atractivo.ruta}</b></a>
                    <div class="name-large"></div>
                    <a><b>${atractivo.descripcion}</b></a>
                  </div>
                </div>
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
      });
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

