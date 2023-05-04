// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";

import {app} from "./firebaseConfig.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyD4M-Klb_H-jTbI8D0pBj1MFJQNQeSTx6w",
    // authDomain: "ubate-travel.firebaseapp.com",
    // databaseURL: "https://ubate-travel-default-rtdb.firebaseio.com",
    // projectId: "ubate-travel",
    // storageBucket: "ubate-travel.appspot.com",
    // messagingSenderId: "950538745193",
    // appId: "1:950538745193:web:c68e75fc7dcdc74cde79f8"

    apiKey: "AIzaSyDN5a3o6NRPefmK6swUbpTUWKa8s4HetTM",
	authDomain: "ubate-travel-6306e.firebaseapp.com",
	projectId: "ubate-travel-6306e",
	storageBucket: "ubate-travel-6306e.appspot.com",
	messagingSenderId: "1003894638308",
	appId: "1:1003894638308:web:52c84d3d8ccad38d384ef1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));