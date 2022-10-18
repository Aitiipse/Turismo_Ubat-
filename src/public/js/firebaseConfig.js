
  import { initializeApp } from "firebase/app";
  import { getFirestore, collection, getDocs } from "firebase/firestore";
  import {getStorage } from "firebase/storage"
  import { getDatabase } from "firebase/database";

//   {/* // Your web app's Firebase configuration */}
const firebaseConfig = {
  #Aqui va la config de firestore
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
  
