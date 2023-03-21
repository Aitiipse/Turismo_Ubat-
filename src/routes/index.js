const { Router, query } = require('express');
const multer = require('multer');
const { db, } = require('../firebase');//importar la base de datos
const { dbFirebase, app, auth, provider, user } = require('../firebaseCloud');//importar la base de datos
const { createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	browserSessionPersistence,
	setPersistence, //percistencia de la sesion
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	GoogleAuthProvider,
} = require('firebase/auth');
const { async } = require('@firebase/util');
const { doc, deleteDoc, updateDoc, setDoc, collection } = require('firebase/firestore'); //crud
const envioImg = require('../functions');

const router = Router();
var imagen = new envioImg();
const storageLocal = multer.memoryStorage();
const upload = multer({ storage: storageLocal });
let a;
let buscarGlobal = "";
let mensaje = undefined; //mensaje de error
let estado = false; //estado de la sesion
let modal = true;
var _idUser = ''; //id del usuario
globalThis.idUser = _idUser;
globalThis.photo = '';
globalThis.name = '';
//verificando estados de la sesion con las rutas
function verificarEstado(req, res, ruta, ruta2, datos = '', data = '', callback) {
	
	//console.log(mensaje);
	// if (estado) {
	if (req.session.idUser !== undefined) {
		console.log(req.session.idUser);
		// res.render('home');
		callback();
		if (modal) {
			res.render(ruta, { datos, data });
		} else {
			res.render(ruta, { layout: false, datos });
			modal = true;
		}
	} else if (mensaje !== undefined) {
		let mensajeError = mensaje;
		mensaje = undefined;
		res.render(ruta2, { layout: false, mensajeError });
	} else {
		console.log('raiz raiz');
		// res.render('index')
		res.render(ruta2, { layout: false });
	}
}

function verificar( req, res, ruta, ruta2, datos = '', data = '') {
	//console.log(mensaje);
	// if (estado) {
		
		if (req.session.idUser !== undefined) {
			console.log('home raiz');
			// res.render('home');
			// callback();
			if (modal) {
				res.render(ruta, { datos, data });
			} else {
				res.render(ruta, { layout: false, datos });
				modal = true;
			}
		} else if (mensaje !== undefined) {
			let mensajeError = mensaje;
			mensaje = undefined;
			res.render(ruta2, { layout: false, mensajeError });
		} else {
			console.log('raiz raiz');
			if (modal) {
				res.render(ruta, { datos, data });
			} else {
				res.render(ruta, { datos, data });
			}
			
		}
	
}

// ------------------------------------ Rutas iniciales --------------------------------------------------//
// ruta principal de la pagina
router.get('/', async (req, res) => {
	console.log(req.session.name);
	publicaciones('atractivos')
		.then((publicaciones) => {
			Users()
				.then((users) => {
					let publicacion = unir(publicaciones, users);
					//res.send(a);
					let info = {
					// 	name: globalThis.name,
					// 	photo: globalThis.photo,
					// }
						name: req.session.name,
						photo: req.session.photo,
					}
					console.log("🚀 ~ file: index.js ~ line 71 ~ .then ~ info", info)
					verificarEstado(req, res, 'atractivos', 'index', publicacion, info, () => {
						//...
					});
				})
				.catch((error) => { console.log("No hay Usuarios", error); });
		})
		.catch((error) => { console.log("No hay publicaiones", error); });
});




// //logout
router.use('/logout', async (req, res, next) => {
	auth.signOut().then(() => {
		// Sign-out successful.
		estado = false;
		buscarGlobal = "";
		// globalThis.idUser = '';
		// globalThis.photo = '';
		// globalThis.name = '';
		delete req.session.name;
		delete req.session.photo;
		delete req.session.idUser;
		console.log('logout');
		//next();
		res.redirect('/');
	}).catch((error) => {
		// An error happened.
	});
});



// -------------------------------------------- register ------------------------------------------ //
// new user email
router.post('/new-user-email', async (req, res) => {
	//console.log('hola dentro de ');
	let { passwordd, confirmPassword, email, phone, name } = req.body;
	var contra = " ";


	if (passwordd !== confirmPassword) {
		contra ==="no coinciden";
		mensaje = 'Las contraseñas no coinciden';
		console.log ('Las contraseñas no coinciden'); 
		res.redirect('/registro');
	} else {
		verficEmail(res, email, () => {
			createUserWithEmailAndPassword(auth, email, passwordd)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					//console.log(user);
					//console.log('registro exitoso');
					// ...
					const userRef = auth.currentUser;
					//obteniendo el id del usuario userRef.uid
					db.collection('usuarios').doc(userRef.uid).set({
						name,
						email,
						phone,
					});
					res.redirect('/atractivos');
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
					console.log('fatal', errorCode);
					//res.sendStatus(errorCode).send(errorMessage);
				});
		});
	}
});


//------------------------------------------------- Logins ----------------------------------------------//
//login user email
router.post('/login-email', async (req, res) => {
	let { email, password } = req.body;
	let contador = 0;

	setPersistence(auth, browserSessionPersistence)
		//console.log('entro')

		
		.then(() => {
			console.log('aca si entro');
			//res.render('home');
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log('Login exitoso');
					// globalThis.idUser = user.uid; //id user global
					req.session.idUser = user.uid;
					estado = true;
					mensaje = undefined;
					data_perfil(user.uid)
						.then((data) => {
							setTimeout(() => {
								// globalThis.photo = data[0].photo;
								// globalThis.name = data[0].name;
								// req.session.name = data[0].name;
								// req.session.photo = data[0].photo;
								res.redirect('/atractivos', );
							}, 1000);
						})
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					//console.log('error', errorCode);
					//res.sendStatus(errorCode).send(errorMessage);
					console.log(typeof (errorCode));
					console.log('error del codigooo ', errorCode);
					//res.render('error', { layout: false });
					console.log('Este es el mensaje de error ', errorMessage);
					if (errorCode === 'auth/user-not-found') {
						console.log(`Intento: ${contador}`);
						
						mensaje = 'CREDENCIALES INCORRECTAS'; 
						
						res.redirect('/');
					} else {
						mensaje = 'CREDENCIALES INCORRECTAS';

						res.redirect('/');
					}
				});
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('error del codigooo ', errorCode);
			//res.render('error', { layout: false });
			console.log('Este es el mensaje de error ', errorMessage);
		});
});




//---------------------------------------------- other actions --------------------------------------------//


// formulario de registro y solicitudes en la pagina de inicio
router.get('/registro', async (req, res) => {
	modal = true;
	verificarEstado(req, res, 'registro', 'index', datos = '', data = '', () => {
		//...
	});
});

//ruta inicial para renderizar publicaciones
router.get('/publicaciones', async (req, res) => {
	publicaciones()
		.then((publicaciones) => {
			verificarEstado(req, res, 'atractivos', 'index', publicaciones, data = '', () => {
				//...
			});
		})
		.catch((error) => { console.log("No hay publicaiones", error); });
});
router.get('/crearPublicacion', async (req, res) => {
	modal = false;
	//res.render('crearPublicacion');
	 verificarEstado(req, res, 'crearPublicacion', 'index', datos = '', /*globalThis.photo*/ req.session.photo, () => {
	//verificarEstado(req, res, 'crearPublicacion', 'crearPublicacion', datos = '', /*globalThis.photo*/ req.session.photo, () => {
		//...
	});
});
router.get('/condiciones', async (req, res) => {
	verificarEstado(req, res, 'atractivos', 'condiciones', datos = '', data = '', () => {
		//...
	});
});

let multpleInput = upload.fields([
	{ name: 'input0' },
	{ name: 'input1' },
	{ name: 'input2' },
	{ name: 'input3' },
	{ name: 'input4' }
]);

// router.get('/editarAcarreos', async (req, res) => {
// 	//res.render('crearPublicacion');
// 	verificarEstado(res, '/editarAcarreos', 'index', datos = '', globalThis.photo, () => {
// 		//...
// 	});
// });
router.get('/crearNoticia', async (req, res) => {
	modal = true;
	//res.render('crearPublicacion');
	verificarEstado(req, res, 'crearNoticia', 'index', datos = '', req.session.photo, () => {
		//...
	});
});

// rufa de los acarreos
router.get('/noticias', async (req, res) => {
	publicaciones('noticias')
		.then((publicaciones) => {
			Users()
				.then((users) => {
					let publicacion = unir(publicaciones, users);
					//res.send(a);
					let publicacion2 = publicacion.sort(function (x, y) {
						let a = x.updatedAt;
						a = a.split('/');
						let d ;
						if (a[1].length === 1){
							d = a[2] + +"0" + a[1] + a[0];
						} else {
							d = a[2] + a[1] + a[0];
						}
						let b = y.updatedAt;
						b = b.split('/');
						let c;
						if (b[1].length === 1) {
							c = b[2] + +"0" + b[1] + b[0];
						} else {
							c = b[2] + b[1] + b[0];
						}
						return parseInt(c) - parseInt(d);
					});
					setTimeout(() => {
						let info = {
							// photo: globalThis.photo,
							// name: globalThis.name,
							photo: req.session.photo,
							name: req.session.name,
						}
						verificarEstado(req, res, 'noticias', 'index', publicacion2, info, () => {
							//...
						});
					}, 500);
				})
				.catch((error) => { console.log("No hay Usuarios", error); });
		})
		.catch((error) => { console.log("No hay publicaiones", error); });
});


router.post('/perfilA', async (req, res) => {
	let { id_p } = req.body;
	console.log(id_p);
	console.log('abri publicaciones');
	publicaciones('noticias')
		.then((publicaciones) => {
			let idusuariover;
			publicaciones.forEach((doc) => {
				console.log(doc);
				if (doc.id === id_p) {
					console.log("entre al ifffff");
					console.log(doc.iduser);
					idusuariover = doc.iduser;
				}
			});
			console.log('1111111111111111111111111111111111111111');
			console.log(idusuariover);
			data_perfil(idusuariover)
				.then((data) => {
					publicaciones_propias("noticias", idusuariover)
						.then((result) => {
							//console.log("---------------------------------");
							// //result.push(data)
							// console.log(result);
							console.log("&&&&&&&&&&&&&&&&&&&&&&&&&");
							console.log(result);
							let unir_publicaciones = unir(result, data);
							console.log(unir_publicaciones);
							// data[0]['photoprincipal'] = globalThis.photo;
							// data[0]['name_us'] = globalThis.name;
							data[0]['photoprincipal'] = req.session.photo;
							data[0]['name_us'] = req.session.name;
							verificarEstado(req, res, 'perfilAcarreos', 'index', unir_publicaciones, data[0], () => {
								console.log('Estoy dentro del perfil con un callback');
							});
						}).catch((error) => {
							console.log(error);
						});
				})
				.catch((error) => {
					console.log(error);
				});
		})
	// let { id_p } = req.body;
	// console.log(id_p);
	// res.render('perfilAcarreos')
});




router.get('/editarAtractivos', async (req, res) => {
	//modal = false;
	 modal = true;
	verificarEstado(req, res, 'editarAtractivos', 'index', datos = '', data = '', () => {
		//...
	});
});
// router.get('/buscarAcarreos', async (req, res) => {
// 	modal = false;
// 	verificarEstado(req, res, 'buscarAcarreos', 'index', datos = '', data = '', () => {
// 		//...
// 	});
// });

// ruta del perfil
router.get('/perfil', async (req, res) => {
	//res.render('perfil');
	//verificarEstado (res, 'perfil', 'index');
	// let id = globalThis.idUser;
	let id = req.session.idUser;
	data_perfil(id)
		.then((data) => {
			publicaciones_propias("atractivos", id)
				.then((result) => {
					console.log("---------------------------------");
					// //result.push(data)
					// console.log(result);
					let unir_publicaciones = unir(result, data);
					console.log(unir_publicaciones);
					verificarEstado(req, res, 'perfil', 'index', unir_publicaciones, data[0], () => {
						console.log('Estoy dentro del perfil con un callback');
					});
				}).catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
});

//actualizar perfil
router.post('/update_data_personal', async (req, res) => {
	let { name, phone, ubication } = req.body;
	data = {
		name,
		phone,
		ubication,
	}
	console.log(data);
	update_data("users", req.session.idUser, data)
		.then((result) => {
			res.redirect('/perfil');
		})
		.catch((error) => {
			console.log(error);
		});
});

//actualizar estado de publicacion
router.post('/estadoPublicacion', async (req, res) => {
	let { id_p } = req.body;
	let data = imagen.getDate();
	data = {
		updatedAt: data,
	}
	console.log(data);
	console.log(id_p);
	update_data("atractivos", id_p, data)
		.then((result) => {
			res.redirect('/perfil');
		})
		.catch((error) => {
			console.log(error);
		});
});

//actualizar imagen de perfil
router.post('/actualizar_img', upload.single('perfil'), async (req, res) => {
	let img = req.file;
	imagen.sendImagesPerfil(img, req.session.idUser, update_data);
	res.redirect('/perfil');
});

//eliminar publicacion
router.post('/eliminarPublicacion', async (req, res) => {
	let { id_p } = req.body;
	console.log(id_p);
	db.collection("atractivos").doc(id_p).delete().then(() => {
		console.log("Document successfully deleted!");
	}).catch((error) => {
		console.error("Error removing document: ", error);
	});
	//await deleteDoc(doc(db, "publications", id_p));
	res.redirect('/perfil');
});

//elimiinar acarreo
router.post('/eliminarA', async (req, res) => {
	let { id_p } = req.body;
	console.log(id_p);
	db.collection("noticias").doc(id_p).delete().then(() => {
		console.log("Document successfully deleted!");
	}).catch((error) => {
		console.error("Error removing document: ", error);
	});
	//await deleteDoc(doc(db, "publications", id_p));
	res.redirect('/misacarreos');
});

//unir publicacion con usuario y mostrarlas publicaciones pgina de inicio
router.get('/atractivos', async (req, res) => {
	modal = true;
	publicaciones('atractivos')
		.then((publicaciones) => {
			Users()
				.then((users) => {
					let publicacion = unir(publicaciones, users);
					//res.send(a);
					setTimeout(() => {
						let actual= req.session.idUser
						let users = db.collection('usuarios');
						if (actual === users){
							
						}
						let info = {
							// photo: globalThis.photo,
							// name: globalThis.name,
							photo: req.session.photo,
							name: req.session.name,
						}

						

						console.log("usuario actual ", actual);
						verificarEstado(req, res, 'atractivos', 'index', publicacion, info, () => {
							//...
						});
					}, 500);
				})
				.catch((error) => { console.log("No hay Usuarios", error); });
		})
		.catch((error) => { console.log("No hay publicaiones", error); });
});

//abrir publicaciones detalladas en otra ventana
router.post('/abrir-publicaciones', async (req, res) => {
	let { id_p } = req.body;
	console.log(id_p);
	console.log('abri publicaciones');
	publicaciones('atractivos')
		.then((publicaciones) => {
			Users()
				.then((users) => {
					let publicacion = unir(publicaciones, users);
					let buscar = publicacion.find(function (element) {
						return element.id == id_p;
					});
					buscarGlobal = buscar;
					// buscarGlobal['name_User'] = globalThis.name;
					buscarGlobal['name_User'] = req.session.name;
					console.log(buscar);
				})
				.catch((error) => { console.log("No hay Usuarios", error); });
		})
		.catch((error) => { console.log("No hay publicaiones", error); });
});
router.get('/modalpublicaciones', async (req, res) => {
	modal = false;
	console.log(buscarGlobal);
	let info = {
		// photo: globalThis.photo,
		// name: globalThis.name,
		// photo: req.session.photo,
		// name: req.session.name,
	}
	console.log(info);
	verificar(req, res, 'modalPublicaciones', 'index', buscarGlobal, info, () => {
		//...
	});
});

//funcion para verificar el email
async function verficEmail(res, email, callback) {
	let users = db.collection('usuarios');
	//consulta con la condicion
	let querySnapshot = await users.where('email', '==', email).get();
	if (querySnapshot.empty) {
		//no esta registrado el email
		callback();
	} else {
		//ya esta registrado el email
		mensaje = 'El email ya esta registrado, inicia sesion';
		res.redirect('/iniciosesion');
	}
}

//traer todos los usuarios
async function Users() {
	let users = db.collection('usuarios');
	//consulta con la condicion
	let querySnapshot = await users.get();
	//console.log('imprimiendo contenido');
	//obtener los datos de la consulta en un nuevo objeto
	let userRegister = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	console.log(typeof (userRegister));//-> salida: object
	//console.log(userRegister);//-> Estructura de datos
	if (userRegister.length > 0) {
		console.log('existe traer usuarios');
		console.log(userRegister);
		return userRegister;
		//res.send(userRegister[0].email);
	} else {
		console.log('No hay usuarios');
		//res.send('no existen publicaciones');
		return 'No hay usuarios';
	}
}
//traer publicaciones
async function publicaciones(dataBase) {
	console.log('imprimiendo contenido');
	console.log(dataBase);
	console.log(typeof (dataBase));//-> salida: string
	let publications = db.collection(dataBase);
	//consulta con la condicion
	let querySnapshot = await publications.get();

	//console.log('imprimiendo contenido');
	//obtener los datos de la consulta en un nuevo objeto
	let userRegister = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	// userRegister.sort(function (x, y) {
	// 	a = x.updatedAt;
	// 	a = a.split('/');
	// 	a = a[2] + a[1] + a[0];
	// 	let b = y.updatedAt;
	// 	b = b.split('/');
	// 	b = b[2] + b[1] + b[0];
	// 	return b - a;
	// });
	console.log(typeof (userRegister));//-> salida: object
	//console.log(userRegister);//-> Estructura de datos
	if (userRegister.length > 0) {
		console.log('existe');
		return userRegister;
	} else {
		console.log('no existen mas publicaciones');
		return 'No hay publicaciones';
	}
}
//traer publicaciones propias
async function publicaciones_propias(dataBase, idUser) {
	console.log('imprimiendo contenido');
	console.log(dataBase);
	console.log(typeof (dataBase));//-> salida: string
	let publications = db.collection(dataBase);
	//consulta con la condicion
	let querySnapshot = await publications.orderBy("updatedAt", "desc").get();
	//console.log('imprimiendo contenido');
	//obtener los datos de la consulta en un nuevo objeto
	let userRegister = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	//console.log(typeof (userRegister));//-> salida: object
	//console.log(userRegister);//-> Estructura de datos
	userRegister.sort(function (x, y) {
		a = x.updatedAt;
		a = a.split('/');
		a = a[2] + a[1] + a[0];
		let b = y.updatedAt;
		b = b.split('/');
		b = b[2] + b[1] + b[0];
		return b - a;
	});
	let data_publications = [];
	let aux = 0;
	userRegister.forEach(element => {
		if (element.iduser === idUser) {
			data_publications.push(element);
		}
		aux++;
	});
	return data_publications;
}

//funion para unir las publicaciones
function unir(publicaciones, user) {
	let publicacionesUser = [];
	let union;
	publicaciones.forEach(element => {
		user.forEach(element2 => {
			if (element.iduser === element2.id) {
				console.log('entre');
				let use = {
					name: element2.name,
					phone: element2.phone,
					ubication: element2.ubication,
					photo: element2.photo,
				};
				union = { ...use, ...element };
				publicacionesUser.push(union);
			}
		})
	});
	//console.log("**********************************");
	//console.log(publicacionesUser);
	return publicacionesUser;
}
// --------------- Probando la seccion traer datos del perfil ----------------------
//traer todos los usuarios
async function data_perfil(idUser) {
	let users = db.collection('usuarios');
	//consulta con la condicion
	let querySnapshot = await users.get();
	//console.log('imprimiendo contenido');
	//obtener los datos de la consulta en un nuevo objeto
	let userRegister = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	//console.log(typeof (userRegister));//-> salida: object
	//console.log(userRegister);//-> Estructura de datos
	let element_perfil = [];
	userRegister.forEach(element => {
		if (element.id == idUser) {
			console.log('entre en el for each');
			//console.log(element);
			element_perfil.push(element);
		}
	});
	//console.log("**********************************");
	//console.log(element_perfil);
	return element_perfil;
}

//actualizar datos de una coleccion
async function update_data(bdatos, id, dataUpdate) {
	const data = db.collection(bdatos).doc(id);
	await data.update(dataUpdate);
}
//subida de imagenes
router.get('/img', async (req, res) => {
	// let id = globalThis.idUser;
	let id = req.session.idUser;
	console.log("Este es el ID ");
	console.log(id);
	data_perfil(id)
		.then(result => {
			console.log('Este es el resultado');
			console.log(result);
		}
		)
		.catch((error) => {
			console.log("No se encontro info ", error);
		})
	res.render('imagenes', { layout: 'menu copy.hbs' });
});
const { ref, uploadString } = require('firebase/storage');
//subir imagnes	a la base de datos
router.post('/storage', async (req, res) => {
	let { file } = req.body;
	console.log(file);
	console.log(typeof (file));
	let img = ref(storage, `${file}`);
	await uploadString(img, 'imagenes/file.png')
		.then((snapshot) => {
			console.log(snapshot);
			res.send('subido');
		});
});

router.get('/storage', async (req, res) => {
	res.render('error', { layout: false });
});

router.get('/tipos',(req, res) => {
    res.render("tipos",  { layout: 'rutas.hbs' })
})

// RUTAS

router.get('/ruta1',(req, res) => {
    res.render("ruta1" ,{ layout:'rutas.hbs' })
})

router.get('/ruta2',(req, res) => {
    res.render("ruta2",{ layout: 'rutas.hbs' })
})

router.get('/ruta3',(req, res) => {
    res.render("ruta3",{ layout: 'rutas.hbs' })
})

router.get('/ruta4',(req, res) => {
    res.render("ruta4",{ layout: 'rutas.hbs' })
})

router.get('/ruta5',(req, res) => {
    res.render("ruta5",{ layout: 'rutas.hbs' })
})

router.get('/lista',(req, res) => {
    res.render("lista",{ layout: 'rutas.hbs' })
})


module.exports = router;
