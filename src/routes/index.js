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
		console.log('home raiz');
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

//------------------------------------------------- Logins ----------------------------------------------//
//login user email
router.post('/login-email', async (req, res) => {
	let { email, password } = req.body;
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
router.get('/iniciosesion', async (req, res) => {
	//res.render('InicioSesion');
	verificarEstado(req, res, 'atractivos', 'InicioSesion', datos = '', data = '', () => {
		//...
	});
});

// formulario de registro y solicitudes en la pagina de inicio
router.get('/registro', async (req, res) => {
	verificarEstado(req, res, 'atractivos', 'registro', datos = '', data = '', () => {
		//...
	});
});

//ruta inicial para renderizar publicaciones
router.get('/publicacioness', async (req, res) => {
	publicaciones()
		.then((publicaciones) => {
			verificarEstado(req, res, 'atractivos', 'index', publicaciones, data = '', () => {
				//...
			});
		})
		.catch((error) => { console.log("No hay publicaiones", error); });
});
router.get('/crearPublicacion', async (req, res) => {
	modal = true;
	//res.render('crearPublicacion');
	// verificarEstado(req, res, 'crearPublicacion', 'index', datos = '', /*globalThis.photo*/ req.session.photo, () => {
	verificarEstado(req, res, 'crearPublicacion', 'crearPublicacion', datos = '', /*globalThis.photo*/ req.session.photo, () => {
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
router.get('/crearAcarreo', async (req, res) => {
	//res.render('crearPublicacion');
	verificarEstado(req, res, 'crearAcarreo', 'index', datos = '', req.session.photo, () => {
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
router.get('/seleccionacarreos', async (req, res) => {
	//res.render('acarreos');
	verificarEstado(req, res, 'seleccionA', 'index', datos = '', data = '', () => {
		//...
	});
});
router.get('/perfilUsuarios', async (req, res) => {
	//res.render('acarreos');
	verificarEstado(req, res, 'perfilUsuarios', 'index', datos = '', () => {
		//...
	});
});
router.get('/perfilAcarreos', async (req, res) => {
	//res.render('acarreos');
	verificarEstado(req, res, 'perfilAcarreos', 'index', datos = '', () => {
		//...
	});
});
router.post('/perfilU', async (req, res) => {
	let { id_p } = req.body;
	console.log(id_p);
	console.log('abri publicaciones');
	publicaciones('atractivos')
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
					publicaciones_propias("atractivos", idusuariover)
						.then((result) => {
							//console.log("---------------------------------");
							// //result.push(data)
							// console.log(result);
							let unir_publicaciones = unir(result, data);
							//console.log(unir_publicaciones);
							// data[0]['photoprincipal'] = globalThis.photo;
							// data[0]['name_us'] = globalThis.name;
							data[0]['photoprincipal'] = req.session.photo;
							data[0]['name_us'] = req.session.name;
							console.log("#####################################");
							console.log(data);

							verificarEstado(req, res, 'perfilUsuarios', 'index', unir_publicaciones, data[0], () => {
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
		.catch((error) => { console.log("No hay publicaiones", error); });
	// let { id_p } = req.body;
	// console.log(id_p);
	// res.render('perfilUsuarios')
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
router.post('/visualizarAcarreos', async (req, res) => {
	let { id_p } = req.body;
	console.log("🚀 ~ file: index.js ~ line 509 ~ router.post ~ id_p", id_p)
	publicaciones('noticias')
		.then((publicaciones) => {
			let idusuarioverr = [];
			publicaciones.forEach((doc) => {
				if (doc.id === id_p) {
					idusuarioverr.push(doc);
				}
			})
			console.log("🚀 ~ file: index.js ~ line 539 ~ .then ~ idusuarioverr", idusuarioverr[0]);
			verificarEstado(req, res, 'editarAcarreos', 'index', idusuarioverr[0], req.session.photo, () => {
				console.log('Estoy dentro del perfil con un callback');
			});
		})
		.catch((error) => {
			console.log("No hay publicaiones", error)
		});
});

router.post('/visualizarPublicacion', async (req, res) => {
	let { id_p } = req.body;
	publicaciones('atractivos')
		.then((publicaciones) => {
			let idusuarioverr = [];
			publicaciones.forEach((doc) => {
				if (doc.id === id_p) {
					idusuarioverr.push(doc);
				}
			})
			console.log("llllllllllllllllllll");
			console.log(idusuarioverr[0].edad);
			console.log("🚀 ~ file: index.js ~ line 539 ~ .then ~ idusuarioverr", idusuarioverr[0]);
			verificarEstado(req, res, 'editarPublicaciones', 'index', idusuarioverr[0], req.session.photo, () => {
				console.log('Estoy dentro del perfil con un callback');
			});
		})
		.catch((error) => {
			console.log("No hay publicaiones", error)
		});
});

router.get('/misacarreos', async (req, res) => {
	// let id = globalThis.idUser;
	let id = req.session.idUser;
	data_perfil(id)
		.then((data) => {
			publicaciones_propias("noticias", id)
				.then((result) => {
					console.log("---------------------------------");
					// //result.push(data)
					// console.log(result);
					let unir_publicaciones = unir(result, data);
					console.log(unir_publicaciones);
					verificarEstado(req, res, 'misAcarreos', 'index', unir_publicaciones, data[0], () => {
						console.log('Estoy dentro del perfil con un callback');
					});
				}).catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
	//res.render('acarreos');
	// verificarEstado(res, 'misAcarreos', 'index', datos = '', data = '', () => {
	// 	//...
	// });
});
router.get('/editarAtractivos', async (req, res) => {
	modal = false;
	// modal = true;
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
						let info = {
							// photo: globalThis.photo,
							// name: globalThis.name,
							photo: req.session.photo,
							name: req.session.name,
						}
						console.log("el nomnbre es: ", info.name);
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

//Busqueda bovinos
router.post('/busquedaBovina', async (req, res) => {
	let { razas, categorias, edad_, ubication, precios,prueba } = req.body;
	buscador = {
		raza: razas,
		categoria: categorias,
		edad: edad_,
		ubication: ubication,
		precio: precios,
	}
	console.log("🚀 ~ file: index.js ~ line 747 ~ router.post ~ buscador", buscador)
	publicaciones('atractivos')
		.then((publicaciones) => {
			Users()
				.then((users) => {
					let publicacion = unir(publicaciones, users);
					let buscando = [];
					let nullB = dataNullBovino(buscador);
					let len = (nullB.length)/2;
					publicacion.forEach((element) => {
						// if (element.raza === razas || element.categoria === categorias || element.edad === edad_ || element.ubication === ubication || element.precio === precios) {
						// 	console.log("🚀 ~ file: index.js ~ line 761 ~ publicacion.forEach ~ razas", razas)
						// 	console.log("🚀 ~ file: index.js ~ line 761 ~ .then ~ element", element.raza)
						// 	buscando.push(element);
						// }
						if(len === 1){
							let aa = nullB[0];
							let b = nullB[1];
							if (element[aa] == b) {
								buscando.push(element);
							}
						}
						if (len === 2) {
							if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] ) {
								buscando.push(element);
							}
						}
						if (len === 3) {
							if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] && element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
							else if (element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1]) {
								buscando.push(element);
							}
							else if (element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
						}
						if (len === 4) {
							if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5] && element[nullB[6]] == nullB[7]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1]){
								buscando.push(element);
							}
							else if (element[nullB[2]] == nullB[3]){
								buscando.push(element);
							}
							else if (element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
							else if (element[nullB[5]] == nullB[6]) {
								buscando.push(element);
							}
						}
						if (len === 5) {
							if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5] && element[nullB[6]] == nullB[7] && element[nullB[8]] == nullB[9]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5] && element[nullB[6]] == nullB[7]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5] ) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3] ) {
								buscando.push(element);
							}
							else if (element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5] && element[nullB[6]] == nullB[7] && element[nullB[8]] == nullB[9]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] ) {
								buscando.push(element);
							}
							else if (element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
							else if (element[nullB[5]] == nullB[6]) {
								buscando.push(element);
							}
							else if (element[nullB[7]] == nullB[8]) {
								buscando.push(element);
							}
						}
					});
					//nullB= dataNullBovino(buscador);
					// let buscar = filtrarBovinos(publicacion, nullB);
					// console.log("Buscaaaaaaaaaaaaaaaaaaaaaar");
					// //console.log(publicacion);
					// console.log(nullB);
					let info = {
						// photo: globalThis.photo,
						// name: globalThis.name,
						photo : req.session.photo,
						name : req.session.name,
					}
					//res.render('buscarPublicaciones.hbs', datos = buscar);
					verificarEstado(req, res, 'buscarPublicaciones', 'index', buscando, info, () => {
						//...
					});
				})
				.catch((error) => { console.log("No hay Usuarios", error); });
		})
		.catch((error) => {
			console.log("No hay publicaiones", error);
		});
});


//Busqueda bovinos
router.post('/busquedaAcarreos', async (req, res) => {
	let { vehiculo, ubication, precios } = req.body;
	buscador = {
		tipoveh : vehiculo,
		ubication: ubication,
		precio: precios,
	}
	console.log("🚀 ~ file: index.js ~ line 747 ~ router.post ~ buscador", buscador)
	publicaciones('noticias')
		.then((publicaciones) => {
			Users()
				.then((users) => {
					let publicacion = unir(publicaciones, users);
					console.log("🚀 ~ file: index.js ~ line 906 ~ .then ~ publicacion", publicacion)
					let buscando = [];
					let nullB = dataNullBovino(buscador);
					let len = (nullB.length) / 2;
					publicacion.forEach((element) => {
						if (len === 1) {
							let aa = nullB[0];
							let b = nullB[1];
							if (element[aa] == b) {
								buscando.push(element);
							}
						}
						if (len === 2) {
							if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1]) {
								buscando.push(element);
							}
						}
						if (len === 3) {
							if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] && element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1] && element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
							else if (element[nullB[2]] == nullB[3] && element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
							else if (element[nullB[0]] == nullB[1]) {
								buscando.push(element);
							}
							else if (element[nullB[2]] == nullB[3]) {
								buscando.push(element);
							}
							else if (element[nullB[4]] == nullB[5]) {
								buscando.push(element);
							}
						}
					});
					//nullB= dataNullBovino(buscador);
					// let buscar = filtrarBovinos(publicacion, nullB);
					// console.log("Buscaaaaaaaaaaaaaaaaaaaaaar");
					// //console.log(publicacion);
					// console.log(nullB);
					let info = {
						// photo: globalThis.photo,
						// name: globalThis.name,
						photo: req.session.photo,
						name: req.session.name,
					}
					//res.render('buscarPublicaciones.hbs', datos = buscar);
					verificarEstado(req, res, 'buscarAcarreos', 'index', buscando, info, () => {
						//...
					});
				})
				.catch((error) => { console.log("No hay Usuarios", error); });
		})
		.catch((error) => {
			console.log("No hay publicaiones", error);
		});
});

//busquda de usuarios
router.post('/buscando', async (req, res) => {
	let { usuario } = req.body;
	usuario = usuario.toLowerCase();
	Users()
		.then((users) => {
			let busqueda = filtrar(users, usuario);
			b = busqueda;
			console.log("----------------------------------------------");
			console.log(b);
			console.log("esta es la busqueda de data");
			console.log(busqueda.length);
			//console.log(busqueda.length(), "longitudddd");
			//publicaciones_propias('publications', id)
			let dataEncontrada = [];
			for (let index = 0; index < busqueda.length; index++) {
				publicaciones_propias('atractivos', busqueda[index].id)
					.then((publicaciones) => {
						let u = unir(publicaciones, users);
						dataEncontrada.push(u);
					})
			}
			setTimeout(() => {
				let info = dataNull(dataEncontrada);
				let org = organizares(info);
				//res.render('buscarPublicaciones', { layout: false, dataEncontrada: org });
				let infoPerfil = {
					// photo: globalThis.photo,
					// name: globalThis.name,
					photo: req.session.photo,
					name: req.session.name,
				}
				verificarEstado(req, res, 'buscarPublicaciones', 'index', org, infoPerfil, () => {
					//...
				});
			}, 2000);
		})
		.catch((error) => {
			console.log("No hay Usuarios", error);
		});
});


//busquda de usuarios para acarreos
router.post('/buscandoAcarreo', async (req, res) => {
	let { usuario } = req.body;
	usuario = usuario.toLowerCase();
	Users()
		.then((users) => {
			let busqueda = filtrar(users, usuario);
			b = busqueda;
			console.log("----------------------------------------------");
			console.log(b);
			console.log("esta es la busqueda de data");
			console.log(busqueda.length);
			//console.log(busqueda.length(), "longitudddd");
			//publicaciones_propias('publications', id)
			let dataEncontrada = [];
			for (let index = 0; index < busqueda.length; index++) {
				publicaciones_propias('noticias', busqueda[index].id)
					.then((publicaciones) => {
						let u = unir(publicaciones, users);
						dataEncontrada.push(u);
					})
			}
			setTimeout(() => {
				let info = dataNull(dataEncontrada);
				let org = organizares(info);
				//res.render('buscarPublicaciones', { layout: false, dataEncontrada: org });
				let infoPerfil = {
					// photo: globalThis.photo,
					// name: globalThis.name,
					photo: req.session.photo,
					name: req.session.name,
				}
				verificarEstado(req, res, 'buscarAcarreos', 'index', org, infoPerfil, () => {
					//...
				});
			}, 2000);
		})
		.catch((error) => {
			console.log("No hay Usuarios", error);
		});
});

//organizar datos
function organizares(data) {
	let dataOrganizada = [];
	for (let index = 0; index < data.length; index++) {
		for (let i = 0; i < data[index].length; i++) {
			dataOrganizada.push(data[index][i]);
		}
	}
	return dataOrganizada;
}
//busqueda por los parametros
async function buscando_parametros(database, parametro, valor) {
	let data = [];
	let q = query(collection(db, database)).where(parametro, "==", valor);
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		data.push(doc.data());
	});
	return data;
}


//validar datos no encontrados
function dataNull(data) {
	let info = []
	for (let index = 0; index < data.length; index++) {
		if (data[index].length !== 0) {
			info.push(data[index]);
		}
	}
	return info;
}
//validar datos no llenos
function dataNullBovino(data) {
	let info = []
	for (let key in data) {
		if (data[key] !== "") {
			info.push(key);
			info.push(data[key]);
		}
	}
	return info;
}
//filtrar las busquedas
function filtrar(info, busqueda) {
	let encontro = [];
	info.forEach((dataUser) => {
		if (((dataUser.name).toLowerCase()).includes(busqueda)) {
			encontro.push(dataUser);
		}
	})
	return encontro;
}

//filtrar las busquedas
function filtrarBovinos(info, busqueda) {
	let encontro = [];
	i = 0;
	info.forEach((dataUser) => {
		// if (dataUser.raza === busqueda.raza ||
		// 	dataUser.categoria === busqueda.categoria ||
		// 	dataUser.ubicacion === busqueda.ubicacion ||
		// 	dataUser.precio === busqueda.precio ||
		// 	dataUser.edad === busqueda.edad) {
		// 	encontro.push(dataUser);
		// }
		if (dataUser[busqueda[i]] === busqueda[i+1]) {
			encontro.push(dataUser);
		}
	})
	return encontro;
}

//funcion para verificar el email
async function verficEmail(res, email, callback) {
	let users = db.collection('users');
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
	let users = db.collection('users');
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
		console.log('existe');
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
	let users = db.collection('users');
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
//------------------------------Esto es una prueba -------------------------------------------------------
router.get('/consulta', async (req, res) => {
	let users = db.collection('users');
	//consulta con la condicion
	let querySnapshot = await users.where('email', '==', 'nayibepelaez03@gmail.com').get();
	console.log('imprimiendo contenido');
	//obtener los datos de la consulta en un nuevo objeto
	let userRegister = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	console.log(typeof (userRegister));//-> salida: object
	console.log(userRegister);//-> Estructura de datos
	if (userRegister.length > 0) {
		console.log('existe');
		res.send(userRegister[0].email);
	} else {
		console.log('no existe');
		res.send('no existe');
	}
	//[
	// 	{
	// 		id: 'SWf7jxis7lSTY7sd87RpZ2eN8B63',
	// 			phone: '3112465403',
	// 				email: 'camilo@gmail.com',
	// 					ubication: 'Carmen de Carupa',
	// 						name: 'Camilo Ruiz'
	// 	}
	// ]
	// para acceder a los datos del objeto
	//res.send(userRegister[0].email);
});
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
