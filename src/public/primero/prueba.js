const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const firebaseConfig = {
	apiKey: "AIzaSyD4M-Klb_H-jTbI8D0pBj1MFJQNQeSTx6w",
	authDomain: "ubate-travel.firebaseapp.com",
	databaseURL: "https://ubate-travel-default-rtdb.firebaseio.com",
	projectId: "ubate-travel",
	storageBucket: "ubate-travel.appspot.com",
	messagingSenderId: "950538745193",
	appId: "1:950538745193:web:c68e75fc7dcdc74cde79f8",
	measurementId: "G-MZCQJVDRPV"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const auth = getAuth();
const email = 'andres@gmail.com';
const password = '123456';
createUserWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in
		const user = userCredential.user;
		// ...
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		// ..
	});

// Get a list of cities from your database
/*
async function hello () {
	console.log('hola');
	const citiesCol = await db.collection('users');
	const citySnapshot = getDocs(citiesCol);
	const cityList = citySnapshot.docs.map(doc => doc.data());
	//res.send('hello');
	console.log(cityList);
}
hello();
*/
// hacer una consulta a la base de datos
async function getCities(db) {
	const citiesCol = collection(db, 'users');
	const citySnapshot = await getDocs(citiesCol);
	const cityList = citySnapshot.docs.map(doc => doc.data());
	console.log(cityList);
	return cityList;
}
getCities(db);