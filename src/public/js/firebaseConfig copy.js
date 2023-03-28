
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const { getAuth, GoogleAuthProvider } = require("firebase/auth");
const { getStorage } = require("firebase/storage");// Your web app's Firebase configuration
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
 const app = initializeApp(firebaseConfig);
 const db = getFirestore();
 const storage = getStorage(app);
 const auth = getAuth();
 const user = auth.currentUser;
const provider = new GoogleAuthProvider(app);

/**
 * Save a New Task in Firestore
 * PARAMETROS DE ATRACTIVOS
 * @param {string} nombre nombre del atractivo
 * @param {string} a1 actividad que se puede desarrollar en el lugar
 * @param {string} a2 actividad que se puede desarrollar en el lugar
 * @param {string} a3 actividad que se puede desarrollar en el lugar
 * @param {string} a4 actividad que se puede desarrollar en el lugar
 * @param {string} a5 actividad que se puede desarrollar en el lugar
 * @param {string} a6 actividad que se puede desarrollar en el lugar
 * @param {string} a7 actividad que se puede desarrollar en el lugar
 * @param {string} a8 actividad que se puede desarrollar en el lugar
 * @param {string} a9 actividad que se puede desarrollar en el lugar
 * @param {string} a10 actividad que se puede desarrollar en el lugar
 * @param {string} descripcion descripcion del atractivo
 * @param {string} ruta ruta a la que pertenece
 * PARAMETROS DE NOTICIAS
 * @param {string} titular Titular que recoge la info de la noticia
 * @param {string} resumen Resumen de la noticia en cuestion
 * @param {string} completa Noticia completa 
 * @param {string} link link de la publicación
 *PARAMETROS DE RUTAS
 * @param {string} ruta Nombre de la ruta
 * @param {string} info Informacion de la ruta
 * @param {string} sitios Sitios o atractivos relacionados
 */

 const guardarformulario = (nombre,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,descripcion, ruta ) =>
  addDoc(collection(db, "atractivos"), { nombre,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,descripcion, ruta });

 const listar = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);

/**
 *
 * @param {string} id ID atractivo
 */
 const eliminarformulario = (id) => deleteDoc(doc(db, "atractivos", id));

 const getTask = (id) => getDoc(doc(db, "atractivos", id));
 const getTaskimg =(id) => getDoc(doc(db,"files", id));

 const actualizarformulario = (id, newFields) =>
  updateDoc(doc(db, "atractivos", id), newFields);

 const getatractivos = () => getDocs(collection(db, "atractivos"));

// -----------------------------------------------------------------------------------
/* NOTICIAS */

 const guardarnoticia = (titular,resumen,completa,link ) =>
  addDoc(collection(db, "noticias"), { titular,resumen,completa,link});

 const listarnoticia = (callback) =>
  onSnapshot(collection(db, "noticias"), callback);

/**
 *
 * @param {string} id ID Noticia
 */
 const eliminarnoticia = (id) => deleteDoc(doc(db, "noticias", id));

 const getnoticia = (id) => getDoc(doc(db, "noticias", id));

 const actualizarnoticia = (id, newFields) =>
  updateDoc(doc(db, "noticias", id), newFields);

 const getnoticias = () => getDocs(collection(db, "noticias"));


/* IMAGENES NOTICIAS */

 const guardarimgnoticia = (imagen ) =>
  addDoc(collection(db, "noticias"), { imagen});

  // -----------------------------------------------------------------------------------
  /* RUTAS */

   const guardarruta = (ruta, info ) =>
  addDoc(collection(db, "rutas"), { ruta, info});

 const listarruta = (callback) =>
  onSnapshot(collection(db, "rutas"), callback);

/**
 *
 * @param {string} id ID RUTA
 */
 const eliminarruta = (id) => deleteDoc(doc(db, "rutas", id));

 const getruta = (id) => getDoc(doc(db, "rutas", id));

 const actualizarruta = (id, newFields) =>
  updateDoc(doc(db, "rutas", id), newFields);

 const getrutas = () => getDocs(collection(db, "rutas"));


/* IMAGENES RUTAS */

 const guardarimgruta = (imagen ) =>
  addDoc(collection(db, "rutas"), { imagen});

  //-----------------------------------------------oooooooooooooooo-----------------------------------------

  module.exports = {
    app,
    db,
    auth,
    user,
    provider,
    storage,
    guardarformulario,
    listar,
    getatractivos,
    actualizarformulario,
    getTaskimg,
    getTask,
    eliminarformulario,
    guardarnoticia,
    listarnoticia,
    eliminarnoticia,
    getnoticia,
    actualizarnoticia,
    getnoticias,
    guardarimgnoticia,
    guardarruta,
    listarruta,
    eliminarruta,
    getruta,
    actualizarruta,
    getrutas,
    guardarimgruta,
  }

