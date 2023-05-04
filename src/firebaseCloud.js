const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const { getAuth, GoogleAuthProvider } = require("firebase/auth");
const { getStorage } = require("firebase/storage");

// const firebaseConfig = {
	
// 	apiKey: "AIzaSyD4M-Klb_H-jTbI8D0pBj1MFJQNQeSTx6w",
// 	authDomain: "ubate-travel.firebaseapp.com",
// 	databaseURL: "https://ubate-travel-default-rtdb.firebaseio.com",
// 	projectId: "ubate-travel",
// 	storageBucket: "ubate-travel.appspot.com",
// 	messagingSenderId: "950538745193",
// 	appId: "1:950538745193:web:c68e75fc7dcdc74cde79f8",
// 	measurementId: "G-MZCQJVDRPV"
// };

const firebaseConfig = {
	apiKey: "AIzaSyDN5a3o6NRPefmK6swUbpTUWKa8s4HetTM",
	authDomain: "ubate-travel-6306e.firebaseapp.com",
	projectId: "ubate-travel-6306e",
	storageBucket: "ubate-travel-6306e.appspot.com",
	messagingSenderId: "1003894638308",
	appId: "1:1003894638308:web:52c84d3d8ccad38d384ef1"
  };

const app = initializeApp(firebaseConfig);
const dbFirebase = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;
const provider = new GoogleAuthProvider(app);
const storage = getStorage(app);


module.exports = {
	app,
	dbFirebase,
	auth,
	user,
	provider,
	storage,
}