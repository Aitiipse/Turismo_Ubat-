const registergoogle = document.getElementById("registergoogle");
const registerfacebook = document.getElementById("registerfacebook");
const google=document.getElementById("google");
const facebook=document.getElementById("facebook");
const contra = document.getElementById("passwordd");
const ccontraseña = document.getElementById("confirmPassword");
const cerrar=document.getElementById("cerrar");
const titulo = document.getElementById("titulo");
const boton = document.getElementById("boton");
const nombre = document.getElementById("name");
const correo = document.getElementById("email-a");
const formulario = document.getElementById("register-form");
const notification = document.getElementById("notification");
/**** */
let check = document.getElementById("cbox");
let valor
check.addEventListener("click", function () {
    if (check.checked) {
		valor=1;
        boton.disabled = false;
        boton.style.background = "#4B8325"
        google.style.pointerEvents = "auto";
        facebook.style.pointerEvents = "auto";
    } else {
		valor=0
        boton.disabled = true;
        boton.style.background = "#A6A6A6"
        google.style.pointerEvents = "none";
        facebook.style.pointerEvents = "none";
    }

})


// register with google
registergoogle.addEventListener('click', (e) => {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider)
		.then((result) => {
			//const credential = provider.credentialFromResult(result);
			//const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;

			// console.log(user.displayName); //name
			// console.log(user.email); //email
			// console.log(user.photoURL); //photo
			// console.log(user.uid); //uid
			// contra.style.display="none";
			ccontraseña.style.display = "none";
			ccontraseña.removeAttribute("required");
			titulo.style.display = "block";
			contra.style.display = "none"
			contra.removeAttribute("required");
			cerrar.style.display = "none";
			facebook.style.display = "none";
			google.style.display = "none";
			nombre.disabled = true;
			correo.disabled = true;
			document.getElementById("id").value = user.uid;
			document.getElementById("photo").value = user.photoURL;
			document.getElementById("nameb").value = user.displayName;
			document.getElementById("emailbb").value = user.email;
			nombre.value = user.displayName;
			correo.value = user.email;
			console.log(user.email);
			boton.innerText = "Finalizar";
			formulario.setAttribute('action', 'register-google')
			//window.location.href = "/registro";
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			//const credential = provider.credentialFromError(error);
			// ...
			console.log(errorMessage);
			//alert(errorMessage);
		});
});

//register facebook
registerfacebook.addEventListener('click', (e) => {
	const provider = new firebase.auth.FacebookAuthProvider();
	auth.signInWithPopup(provider)
		.then((result) => {
			//const credential = provider.credentialFromResult(result);
			//const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;

			// console.log(user.displayName); //name
			// console.log(user.email); //email
			// console.log(user.photoURL); //photo
			// console.log(user.uid); //uid
			// contra.style.display="none";
			console.log(user);
			ccontraseña.style.display = "none";
			ccontraseña.removeAttribute("required");
			titulo.style.display = "block";
			contra.style.display = "none"
			contra.removeAttribute("required");
			cerrar.style.display = "none";
			facebook.style.display = "none";
			google.style.display = "none";
			nombre.disabled = true;
			correo.disabled = true;
			document.getElementById("id").value = user.uid;
			document.getElementById("photo").value = user.photoURL;
			document.getElementById("nameb").value = user.displayName;
			document.getElementById("emailbb").value = user.email;
			nombre.value = user.displayName;
			correo.value = user.email;
			boton.innerText = "Finalizar";
			formulario.setAttribute('action', 'register-facebook')
			//window.location.href = "/registro";
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			//const credential = provider.credentialFromError(error);
			// ...
			console.log(errorMessage);
			console.log('Codigo de error ');
			console.log(errorCode);
			//alert(errorMessage);
			// if (errorCode == 'auth/account-exists-with-different-credential') {
			// 	formulario.setAttribute('action', 'errorRegisterFacebook')
			// }
			// formulario.setAttribute('action', 'errorRegisterFacebook')
			window.location.assign("/errorRegisterFacebook");
		})
});

// login google
const logingoogle = document.getElementById("logingoogle");
const loginfacebook = document.getElementById("loginfacebook");
const formlogin = document.getElementById("login-form");
const email = document.getElementById("email");
const emailb = document.getElementById("emailb");
const password = document.getElementById("password");

//login google
logingoogle.addEventListener('click', (e) => {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider)
		.then((result) => {
			const user = result.user;
			console.log('entre');
			password.removeAttribute("required");
			email.removeAttribute("required");
			emailb.value = user.email;
			formlogin.setAttribute('action', 'login-google');
			formlogin.submit();
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			console.log(errorMessage);
		});
});

//login facebook
loginfacebook.addEventListener('click', (e) => {
	const provider = new firebase.auth.FacebookAuthProvider();
	auth.signInWithPopup(provider)
		.then((result) => {
			const user = result.user;
			console.log('entre');
			password.removeAttribute("required");
			email.removeAttribute("required");
			emailb.value = user.email;
			formlogin.setAttribute('action', 'login-facebook');
			formlogin.submit();
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			console.log(errorMessage);
			console.log('Codigo de error ', errorCode);
			window.location.assign("/errorRegisterFacebook");
		});
});


// // Initial config
// // This is not "real security", API Keys are
// // able to authenticate users, anything else :D
// const firebaseConfig = {
//   apiKey: "AIzaSyD4M-Klb_H-jTbI8D0pBj1MFJQNQeSTx6w",
//   authDomain: "ubate-travel.firebaseapp.com",
//   databaseURL: "https://ubate-travel-default-rtdb.firebaseio.com",
//   projectId: "ubate-travel",
//   storageBucket: "ubate-travel.appspot.com",
//   messagingSenderId: "950538745193",
//   appId: "1:950538745193:web:c68e75fc7dcdc74cde79f8"
// };

// firebase.initializeApp(firebaseConfig);


// // Connect application with firebase
// const form = document.forms['loginForm'];
// firebase.auth().onAuthStateChanged(handleAuthState);
// form.addEventListener('submit', handleFormSubmit);


// // Application defs
// function handleAuthState(user) {
//   if (user) {
//     showPrivateInfo()
//     return console.log('Habemus user 🎉');
//   }

//   showLoginForm()
//   return console.log('No habemus user 😭');
// }

// function handleFormSubmit(event) {
//   event.preventDefault();

//   const email = form['email'].value;
//   const password = form['password'].value;
//   const isLoginOrSignup = form['isLoginOrSignup'].value;

//   if (isLoginOrSignup === 'isLogin') {
//     return loginUser({ email, password });
//   }

//   return createUser({ email, password });
// }


// // Application Utils
// function showPrivateInfo(user) {
//   const loginForm = document.getElementById('loginFormUI');
//   loginForm.style.display = 'none';

//   const hiddenPrivateInfo = document.getElementById('hiddenPrivateInfo');
//   hiddenPrivateInfo.style.display = 'block';
//   hiddenPrivateInfo.innerHTML = `
//     <p>Esto <b>SI</b> es información confidencial ㊙</p>
//     <button id="btnLogout" class="button">Logout</button>
//   `;

//   const btnLogout = document.getElementById('btnLogout');
//   btnLogout.addEventListener('click', signoutUser);
// }

// function showLoginForm() {
//   const loginForm = document.getElementById('loginFormUI');
//   loginForm.style.display = 'block';

//   const hiddenPrivateInfo = document.getElementById('hiddenPrivateInfo');
//   hiddenPrivateInfo.style.display = 'none';
//   hiddenPrivateInfo.innerHTML = `
//     <p>Nada que mostrar, tenes que logearte, bro...</p>
//   `;
// }


// // Firebase defs
// function createUser({ email, password }) {
//   console.log('Creating user ' + email);

//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(function (user) {
//       console.log('¡Creamos el user, bro! Huepaje!');
//     })
//     .catch(function (error) {
//       if (error.code === 'auth/email-already-in-use') {
//         console.log('Ya existe el usuario');
//         const soLogin = confirm(
//           `Ya te habias registrado con este email, bro 😝.
//           ¿Quieres iniciar sesión ✨?`
//         );
//         return !!soLogin ? loginUser({ email, password }) : alertTryAgain(error);;
//       }

//       return alertTryAgain(error);
//     });
// }

// function loginUser({ email, password }) {
//   console.log('Loging user ' + email);

//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then(function (user) {
//       console.log('Credenciales correctas, brother, bienvenido.');
//     })
//     .catch(function (error) {
//       console.log(error);
//       alertTryAgain(error);
//     });
// }

// function signoutUser() {
//   firebase.auth().signOut();
// }


// // General Utils
// function alertTryAgain(error) {
//   console.log(error);
//   return alert('Error, intenta de nuevo ⛈');
// }