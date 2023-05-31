const { Router } = require('express');
const multer = require('multer')
const { storage, auth } = require('../firebaseCloud');//importar la base de datos
const {
	browserSessionPersistence,
	setPersistence, //percistencia de la sesion
} = require('firebase/auth');
//import { idUser } from "../routes/index";
//let id = require('../routes/index');//importar el id del usuario
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { db, } = require('../firebase');//importar la base de datos
const { async } = require('@firebase/util');
const envioImg = require('../atractivos_img');
var imagen = new envioImg();
const router = Router();
const storageLocal = multer.memoryStorage();
const upload = multer({ storage: storageLocal });
let mensajeError = undefined;

setPersistence(auth, browserSessionPersistence)

const user = auth.currentUser ;
userEmail = user;

//envio post de imagenes con multer y firebase storage
router.post('/new_publication', upload.single('input0'), (req, res) => {
	let img = req.file;

	let data = {
		nombre,
		a1,
		a2,
		a3,
		a4,
		a5,
		a6,
		a7,
		a8,
		a9,
		a10,
		decripcion,
		street,
		ruta,

	} = req.body;
	console.log("-------------------");
	console.log(data);
	console.log("-------------------");
	console.log(img);

	let fecha = getDate();
	let publication = {
		createdAt: fecha,
		iduser: userEmail ,
		...data,
		input0: '',
		updatedAt: fecha,
	};
	console.log(publication);
	
	mensajeError = 'CREADO CON ÉXITO';
	imagen.sendImages(img, imagen.enviarPublication, data);
	res.render('atractivos', { mensajeError });
	

});

//obtener la fecha actual en formato dd/mm/yyyy
function getDate() {
	let date = new Date();
	let fecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	return fecha;
}


module.exports = router;