import { addDoc1, upload, publish, queryImages, showImage, storage, app, db, listar, guardarformulario, eliminarformulario, getTask, actualizarformulario, getatractivos, } from "./firebaseConfig.js";

  const formatractivos = document.getElementById("formularioatractivos");
  const formrespuesta = document.getElementById("formulario-container");
  const formrespuestan = document.getElementById("formulario-noticias");

  
  let editStatus = false;
  let id = "";
  let form1 = document.querySelector("#uploader");
  let form = document.querySelector("#formularioatractivos");

  let nombre = document.getElementById("nombre");
  let a1 = document.getElementById("a1");
  let a2 = document.getElementById("a2");
  let a3 = document.getElementById("a3");
  let a4 = document.getElementById("a4");
  let a5 = document.getElementById("a5");
  let a6 = document.getElementById("a6");
  let a7 = document.getElementById("a7");
  let a8 = document.getElementById("a8");
  let a9 = document.getElementById("a9");
  let a10 = document.getElementById("a10");
  let descripcion = document.getElementById("descripcion");

  let principal = document.querySelectorAll(".img_p")[0];
  let subir = document.querySelectorAll(".subir")[0];
  let foto = document.querySelectorAll(".fotos")[0];

  let IF_1 = document.querySelectorAll(".IF_1")[0];
  let f1 = document.querySelectorAll(".f1")[0];

  IF_1.addEventListener("click", function () {
    f1.click();
  })

  f1.addEventListener("change", function () {
    var files = this.files;
    valor = files.length;
    console.log(valor);
    visualizar2(files[0]);
})

function visualizar(file, input, foto, imagen, video) {
  var imgCodified = URL.createObjectURL(file);

  if (file.type === "video/mp4") {
      video.style.display = "flex";
      video.src = imgCodified;
      foto.style.display = "flex";
      input.style.display = "none";
      imagen.style.display = "none";
  } else {
      imagen.style.display = "flex";
      imagen.src = imgCodified;
      foto.style.display = "flex";
      input.style.display = "none";
      video.style.display = "none";
  }
}
function visualizar2(file, imagen2) {
  var imgCodified = URL.createObjectURL(file);
  separador.style.display = "none";
  requerido.style.display = "none";
  IF_1.style.display = "none";
  foto.style.display = "flex";
  principal.src = imgCodified;

}
foto.addEventListener("click", function () {
  foto.style.display = "none";
  separador.style.display = "flex";
  requerido.style.display = "flex";
  IF_1.style.display = "flex";
  principal.src = "./usuarios/menu/icons/camera.png";

})
subir.addEventListener("click", function () {
  edad_es.value=anos.value
  if (valor === 0) {
      modalf.style.display = "flex";
      requerido.style.color = "red";
      requerido.innerHTML = "Debe elegir una imagen de portada";
      IF_1.style.border = "5px dashed red";
  }
})

  window.addEventListener("DOMContentLoaded", async (e) => {
 
  
    listarnoticia((querySnapshot) => {
      formrespuesta.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const atractivo = doc.data();
  
        formrespuesta.innerHTML += `
        <article class= "card2">
            <div class="word">
            <div class="word1">
            <h3>${atractivo.nombre}   </h3>
            </div><hr>
            <div class="word2">
            <h4>RUTA ${atractivo.ruta}</h4>
            </div><hr>
            <div class="word3">
            <p>ACTIVIDADES ${atractivo.a1} ${atractivo.a2} ${atractivo.a3} ${atractivo.a4} ${atractivo.a5} ${atractivo.a6} ${atractivo.a7} ${atractivo.a8} ${atractivo.a9} ${atractivo.a10}</p>
            </div><hr>
            <div class="word4">
            <p>DESCRIPCION ${atractivo.descripcion}</p>
            <p>Link${atractivo.link}</p>
            </div>
       
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
            formatractivos["subir"].innerText = "Actualizar";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });


  function archivoHandler (){ async (e)=> {

    const archivo = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("archivo cargado:",archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);

  }};

  const submitHandler = async (e)=> {
    e.preventDefault()
const nombreArchivo = e.target.nombre.value;
if (!nombreArchivo) {
  alert("coloca un nombre")
  return
}
const coleccionRef =  app.firestore().collection("archivos");
const docu = await coleccionRef.doc(nombreArchivo).set({nombre: nombreArchivo, url: archivoUrl});
console.log("archivo cargado:", nombreArchivo, "ulr:", archivoUrl);
window.location="/"

  }
  
  formatractivos.addEventListener("submit", async (e) => {
    e.preventDefault();
  
		let fileInput = formatractivos.querySelector("#file");
		console.log(fileInput.files);
			publish({ file });
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
          a2: a2.value,
          a3: a3.value,
          a4: a4.value,
          a5: a5.value,
          a6: a6.value,
          a7: a7.value,
          a8: a8.value,
          a9: a9.value,
          a10: a10.value,
          descripcion: descripcion.value,
          ruta: ruta.value,
        });
  
        editStatus = false;
        id = "";
        formatractivos["subir"].innerText = "Agregar";
      }
  
      formatractivos.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });
//----------------------------------------------------------------
//images


  async function main() {
    var firebaseConfig = {
      // YOUR FIREBASE CREDENTIALS HERE
      apiKey: "AIzaSyD4M-Klb_H-jTbI8D0pBj1MFJQNQeSTx6w",
      authDomain: "ubate-travel.firebaseapp.com",
      databaseURL: "https://ubate-travel-default-rtdb.firebaseio.com",
      projectId: "ubate-travel",
      storageBucket: "ubate-travel.appspot.com",
      messagingSenderId: "950538745193",
      appId: "1:950538745193:web:c68e75fc7dcdc74cde79f8"
      // measurementId: "G-3LYFGJK1ET"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    let form = document.querySelector("#formularioatractivos");
  
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
  
      let fileInput = formularioatractivos.querySelector("#file");
      console.log(fileInput.files);
      for(let i = 0; i < fileInput.files.length; i++){
        let file = fileInput.files[i];
        publish({ file });
      }
  
    });
  
    queryImages();

  }
  main();
  


  
  
  
  
  
  
  
