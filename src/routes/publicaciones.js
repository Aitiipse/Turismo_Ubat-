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
const upload = multer({
	storage: storageLocal,
	limits: {
		fileSize: 2 * 1024 * 1024, // Tamaño máximo de 2 MB
	},
});
let mensajeError = undefined;

setPersistence(auth, browserSessionPersistence)

const user = auth.currentUser;
userEmail = user;

//envio post de imagenes con multer y firebase storage


router.post('/new_publication', (req, res, next) => {

	upload.single('input0')(req, res, (err) => {
		if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
			mensaje = 'Revisa tu imagen, excede las dimensiones o el peso maximo de 2 Mb';
			let mensajeError = mensaje;
			return res.send(`<script>alert("${mensajeError}"); window.history.back();</script>`);


		} else if (err) {
			// Otro tipo de error de Multer u otro error en general
			mensaje = 'Ocurrió un error al cargar el archivo.';
			let mensajeError = mensaje;
			console.error(err);
			return res.send(`<script>alert("${mensajeError}"); window.history.back();</script>`);
		}

		next();
	});
}, (req, res) => {
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
		entradaDo,
		salidaDo,
		entradaLu,
		salidaLu,
		entradaMa,
		salidaMa,
		entradaMi,
		salidaMi,
		entradaJu,
		salidaJu,
		entradaVi,
		salidaVi,
		entradaSa,
		salidaSa,
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
		iduser: userEmail,
		...data,
		input0: '',
		updatedAt: fecha,
	};
	console.log(publication);

	const allowedMimeTypes = ['image/jpeg', 'image/png']; // Lista de tipos MIME permitidos
	if (!allowedMimeTypes.includes(img.mimetype)) {
		// El tipo de archivo no es permitido
		const mensajeError = 'El tipo de archivo no es permitido. Por favor, seleccione una imagen válida (JPEG o PNG).';
	//	return res.status(400).json({ error: mensajeError });

                        return res.send(`<script>alert("${mensajeError}"); window.history.back();</script>`);
	}

	// Verificar si se cargó un archivo
	if (!img) {
		// No se cargó ninguna imagen
		const mensajeError = 'Debe seleccionar una imagen.';
		return res.render('atractivos', { mensajeError });
	}

	// El archivo se cargó correctamente
	imagen.sendImages(img, imagen.enviarPublication, data);
	const mensajeError = 'REGISTRO CREADO'; // Agregar el mensaje deseado

	res.render('atractivos', { mensajeError });
});



//obtener la fecha actual en formato dd/mm/yyyy
function getDate() {
	let date = new Date();
	let fecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	return fecha;
}


module.exports = router;