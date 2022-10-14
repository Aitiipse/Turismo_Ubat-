import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4M-Klb_H-jTbI8D0pBj1MFJQNQeSTx6w",
    authDomain: "ubate-travel.firebaseapp.com",
    databaseURL: "https://ubate-travel-default-rtdb.firebaseio.com",
    projectId: "ubate-travel",
    storageBucket: "ubate-travel.appspot.com",
    messagingSenderId: "950538745193",
    appId: "1:950538745193:web:c68e75fc7dcdc74cde79f8"
  };
  
  // Initialize Firebase
  
  const formularioatractivos = document.getElementById('formularioatractivos')
  const app = initializeApp(firebaseConfig); 
  const db = getFirestore(app);
  const atractivosref = firebase.database(app).ref('atractivos')
    
    // formularioatractivos.addEventListener('submit', (e) => {
      
    //   const nombre=formularioatractivos['nombre'].value
    //   const a1=formularioatractivos['a1'].value
    //   const a2=formularioatractivos['a2'].value
    //   const a3=formularioatractivos['a3'].value
    //   const a4=formularioatractivos['a4'].value
    //   const a5=formularioatractivos['a5'].value
    //   const a6=formularioatractivos['a6'].value
    //   const a7=formularioatractivos['a7'].value
    //   const a8=formularioatractivos['a8'].value
    //   const a9=formularioatractivos['a9'].value
    //   const a10=formularioatractivos['a10'].value
    //   const imagen=formularioatractivos['imagen'].value
    //   const descripcion=formularioatractivos['descripcion'].value
    //   const ruta=formularioatractivos['ruta'].value
    //   const contraseña=formularioatractivos['contraseña'].value
  
    //   const registraratractivo = atractivosref.push()
    //     console.log(registraratractivo)
    //     console.log(registraratractivo.path.pieces_[1])
      //  registraratractivo.set({
      //      Uid : registraratractivo.path.pieces_[1],
      //      Nombre:nombre,
      //      A1 :a1,
      //      A2 :a2,
      //      A3 :a3,
      //      A4 :a4,
      //      A5 :a5,
      //      A6 :a6,
      //      A7 :a7,
      //      A8 :a8,
      //      A9 :a9,
      //      A10 :a10,
      //      Imagen : imagen,
      //      Descripcion :descripcion,
      //      Ruta :ruta,
      //      Contraseña:contraseña,
      
      
      
      async function getCities(db) {
        const citiesCol = collection(db, 'cities');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        return cityList;
      }
    })
    