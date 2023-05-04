// addDoc({ collection: 'files', data: { fileName: '' } })
const addDoc = async ({ collection, data }) => {
	let document = {
		...data,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
	}

	// 1. Una colección
	let collectionRef = firebase.firestore().collection(collection);
	// 2. Guardar el documento
	return collectionRef.add(document);
}

// upload({ file:})
const upload = async ({ file }) => {
	// 1. Referencia al espacio en el bucket donde estará el archivo
	let storageRef = firebase.storage().ref().child(`images/${file.name}`);
	// 2 Subir el archivo
	await storageRef.put(file);
	// 3. Retornar la referencia
	return storageRef;
}


const publish = async ({ file }) => {
	let storageRef = await upload({ file });
	console.log('lo que contiene storage')
	//recupera los meta datos
	storageRef.getMetadata().then((data) => {
		console.log(data.contentType);
	});

	return addDoc({ collection: 'files', data: { path: storageRef.fullPath } })
}

const queryImages = async () => {
	// 1. Colección
	let collection = firebase.firestore().collection('files')
		.orderBy('createdAt', 'desc');
	// 2. onSnapshot a cambios en los documentos
	collection.onSnapshot((snapshot) => {
		snapshot.docChanges().forEach((change) => {
			if (change.type === "added") {
				showImage(change.doc.data());
			}
		});
	});
}

const showImage = async (docData) => {
	let node = document.createElement("div");
	node.classList.add("item");
	let url = await firebase.storage().ref(docData.path).getDownloadURL();
	//console.log(url);
	node.innerHTML = `
   <img class='image' src='${url}' />`;

	let container = document.querySelector("#images");
	container.append(node);

	//Descargar archivo

}


async function main() {
	var firebaseConfig = {
		// // YOUR FIREBASE CREDENTIALS HERE
		// apiKey: "AIzaSyD4M-Klb_H-jTbI8D0pBj1MFJQNQeSTx6w",
		// authDomain: "ubate-travel.firebaseapp.com",
		// databaseURL: "https://ubate-travel-default-rtdb.firebaseio.com",
		// projectId: "ubate-travel",
		// storageBucket: "ubate-travel.appspot.com",
		// messagingSenderId: "950538745193",
		// appId: "1:950538745193:web:c68e75fc7dcdc74cde79f8"
		// // measurementId: "G-3LYFGJK1ET"

		apiKey: "AIzaSyDN5a3o6NRPefmK6swUbpTUWKa8s4HetTM",
	authDomain: "ubate-travel-6306e.firebaseapp.com",
	projectId: "ubate-travel-6306e",
	storageBucket: "ubate-travel-6306e.appspot.com",
	messagingSenderId: "1003894638308",
	appId: "1:1003894638308:web:52c84d3d8ccad38d384ef1"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	let form = document.querySelector("#uploader");

	form.addEventListener("submit", (ev) => {
		ev.preventDefault();

		let fileInput = form.querySelector("#file");
		console.log(fileInput.files);
		for(let i = 0; i < fileInput.files.length; i++){
			let file = fileInput.files[i];
			publish({ file });
		}

	});

	queryImages();



}

main();