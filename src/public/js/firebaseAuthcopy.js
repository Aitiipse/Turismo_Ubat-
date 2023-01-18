const firebaseConfig = {
  apiKey: "AIzaSyD4M-Klb_H-jTbI8D0pBj1MFJQNQeSTx6w",
  authDomain: "ubate-travel.firebaseapp.com",
  databaseURL: "https://ubate-travel-default-rtdb.firebaseio.com",
  projectId: "ubate-travel",
  storageBucket: "ubate-travel.appspot.com",
  messagingSenderId: "950538745193",
  appId: "1:950538745193:web:c68e75fc7dcdc74cde79f8"
  }; 
const {initializeApp}= require('firebase/app'); 

const {	signInWithEmailAndPassword,signOut,browserSessionPersistence,setPersistence,onAuthStateChanged,} = require('firebase/auth');
initializeApp(firebaseConfig);
// Connect application with firebase





const form = document.forms['loginForm'];
onAuthStateChanged(handleAuthState);
form.addEventListener('submit', handleFormSubmit);


// Application defs
function handleAuthState(user) {
if (user) {
return console.log('siiii usuario');

}

showLoginForm()
window.location.href='/'

return console.log('No usuario');

}

function handleFormSubmit(event) {
event.preventDefault();

const email = form['email'].value;
const password = form['password'].value;
const isLoginOrSignup = 'isLogin';

if (isLoginOrSignup === 'isLogin') {
  return loginUser({ email, password });
}


}


function loginUser({ email, password }) {
console.log('Loging user ' + email);

signInWithEmailAndPassword(email, password)
  .then(function (user) {
    console.log('CORRECTO!! INICIO SESION');
    user1=user;
    console.log(user1);
    location.href ="/administrador"

  })
  .catch(function (error) {
    console.log(error);
    alertTryAgain(error);
  });
}

function signoutUser() {
signOut();
}


// General Utils
function alertTryAgain(error) {
console.log(error);
form.reset();

return alert('CORREO O CONTRASEÑA ERONEOS, POR FAVOR INGRESE LAS CREDENCIALES DE NUEVO');
}


