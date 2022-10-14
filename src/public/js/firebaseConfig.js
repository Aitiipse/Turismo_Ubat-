
  import { initializeApp } from "firebase/app";
  import { getFirestore, collection, getDocs } from "firebase/firestore";
  import {getStorage } from "firebase/storage"
  import { getDatabase } from "firebase/database";

//   {/* // Your web app's Firebase configuration */}
const firebaseConfig = {
  apiKey: "AIzaSyD4M-Klb_H-jTbI8D0pBj1MFJQNQeSTx6w",
  authDomain: "ubate-travel.firebaseapp.com",
  databaseURL: "https://ubate-travel-default-rtdb.firebaseio.com",
  projectId: "ubate-travel",
  storageBucket: "ubate-travel.appspot.com",
  messagingSenderId: "950538745193",
  appId: "1:950538745193:web:c68e75fc7dcdc74cde79f8"
};


  // const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
  // const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
 
    // The value of `databaseURL` depends on the location of the database
  
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const storage = getStorage(app);
  const database = getDatabase(app);

  module.exports = {
    app,
    db,
    storage,
    database,
  }
  