const { Router } = require('express');
const multer = require('multer')
const { storage } = require('../firebaseCloud');//importar la base de datos
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { db, } = require('../firebase');//importar la base de datos

const  envioImg  = require('../noticias_img');

const router = Router();
const storageLocal = multer.memoryStorage();
const upload = multer({
  storage: storageLocal,
  limits: {
    fileSize: 4 * 1024 * 1024, // Tamaño máximo de 4 MB
  },
});
var imagen = new envioImg();
let mensaje = undefined;


// Ruta para procesar la carga de una nueva noticia
router.post('/new-noticia', (req, res, next) => {
	
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

    // Continuar con el procesamiento de la solicitud
    next();
  });
}, (req, res) => {
  let img = req.file;
  let data = {
    titular,
    resumen,
    completa,
  } = req.body;

  console.log("-------------------");
  console.log(data);
  console.log("-------------------");
  console.log(img);

  const allowedMimeTypes = ['image/jpeg', 'image/png']; // Lista de tipos MIME permitidos
  if (!allowedMimeTypes.includes(img.mimetype)) {
	// El tipo de archivo no es permitido
	const mensajeError = 'El tipo de archivo no es permitido. Por favor, seleccione una imagen válida (JPEG o PNG).';
	return res.status(400).json({ error: mensajeError });
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

  

//edit acarreo
router.post('/edit-noticia', upload.single('noticia'), async(req, res) => {
	let img = req.file;
	let data = {
		titular,
		resumen,
		completa,
	} = req.body;
	
	let a = data;
	data['updatedAt'] = imagen.getDate();
	imagen.sendImages(img, imagen.editData, id);
	const dataupdate = db.collection("noticias").doc(id);
	await dataupdate.update(data);
	res.redirect('/atractivos');
});

module.exports = router;