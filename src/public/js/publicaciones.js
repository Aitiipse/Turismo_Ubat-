const { Router } = require('express');
const multer = require('multer')
const { storage } = require('../firebaseCloud');//importar la base de datos
//import { idUser } from "../routes/index";
//let id = require('../routes/index');//importar el id del usuario
const { ref, uploadBytes, getDownloadURL } = require ("firebase/storage");
const { db, } = require('../firebase');//importar la base de datos
const { async } = require('@firebase/util');
const  envioImg  = require('../atractivos_img');
var imagen = new envioImg();
const router = Router();
const storageLocal = multer.memoryStorage();
const upload = multer({ storage: storageLocal });

//envio post de imagenes con multer y firebase storage
router.post('/new_publication',  upload.single('input0'),  (req, res) => {
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
		createdAt : fecha,
		iduser : globalThis.idUser,
		...data,
		input0: '',
		updatedAt : fecha,
	};
	console.log(publication);
	//-> files[inputt][0].originalname forma para ingresar a los datos
	//Object.keys(files).length -> longitud de los archivos que se subieron
	//sendImages(files, enviar, text1, text2);
	//guardar publicaciones en firebase database
	imagen.sendImages(img, imagen.enviarPublication, data);
	res.redirect('/atractivos');
	
});

//obtener la fecha actual en formato dd/mm/yyyy
function getDate() {
	let date = new Date();
	let fecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	return fecha;
}


module.exports = router;