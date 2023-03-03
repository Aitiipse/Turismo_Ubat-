
  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, getDoc,updateDoc,} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-storage.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";
// Your web app's Firebase configuration
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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
export const auth = getAuth();
export const user = auth.currentUser;
export const provider = new GoogleAuthProvider(app);
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
 * @param {string} rut Nombre de la ruta
 * @param {string} info Informacion de la ruta
 * @param {string} sitios Sitios o atractivos relacionados
 */


 
export const guardarAtractivo = (nombre,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,descripcion, ruta ) =>
  addDoc(collection(db, "atractivos"), { nombre,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,descripcion, ruta });

// listar pagina principal
  export const listar = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);

  export const listarAtractivos = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);

export const listar_p = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);

  // Listar sitios en cada una de las rutas
export const listarsitios1 = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);
export const listarsitios2 = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);
export const listarsitios3 = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);
export const listarsitios4 = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);
export const listarsitios5 = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);

// editar-eliminar atractivos

export const listaEdAt = (callback) =>
  onSnapshot(collection(db, "atractivos"), callback);

/**
 *
 * @param {string} id ID atractivo
 */

export const eliminarAtractivo = (id) => deleteDoc(doc(db, "atractivos", id));

export const getAtractivo = (id) => getDoc(doc(db, "atractivos", id));

export const actualizarAtractivo = (id, newFields) =>
  updateDoc(doc(db, "atractivos", id), newFields);

export const getAtractivos = () => getDocs(collection(db, "atractivos"));




// -----------------------------------------------------------------------------------
/* NOTICIAS */

export const guardarnoticia = (titular,resumen,completa,link ) =>
  addDoc(collection(db, "noticias"), { titular,resumen,completa,link});

export const listarnoticia = (callback) =>
  onSnapshot(collection(db, "noticias"), callback);

  export const listarnoticia_p = (callback) =>
  onSnapshot(collection(db, "noticias"), callback);

/**
 *
 * @param {string} id ID Noticia
 */
export const eliminarnoticia = (id) => deleteDoc(doc(db, "noticias", id));

export const getnoticia = (id) => getDoc(doc(db, "noticias", id));

export const actualizarnoticia = (id, newFields) =>
  updateDoc(doc(db, "noticias", id), newFields);

export const getnoticias = () => getDocs(collection(db, "noticias"));


/* IMAGENES NOTICIAS */

export const guardarimgnoticia = (imagen ) =>
  addDoc(collection(db, "noticias"), { imagen});

  // -----------------------------------------------------------------------------------
  /* RUTAS */

  export const guardarruta = (rut, info ) =>
  addDoc(collection(db, "rutas"), { rut, info});

export const listarruta = (callback) =>
  onSnapshot(collection(db, "rutas"), callback);


/**
 *
 * @param {string} id ID RUTA
 */
export const eliminarruta = (id) => deleteDoc(doc(db, "rutas", id));

export const getruta = (id) => getDoc(doc(db, "rutas", id));

export const actualizarruta = (id, newFields) =>
  updateDoc(doc(db, "rutas", id), newFields);

export const getrutas = () => getDocs(collection(db, "rutas"));


