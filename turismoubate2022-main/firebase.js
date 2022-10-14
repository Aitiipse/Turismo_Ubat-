
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  const db =getFirestore()

  export const onguardar =(correo, contraseña)=>{
        addDoc (collection(db,"formulario-inicio"),{correo, contraseña})  
    }

    export const onlistar =() => getDocs(collection(db,'formulario-inicio'))

    export const ontraer = (callback) => onSnapshot(collection(db,'formulario-inicio'), callback)
    
    export const eliminarregistro = id => deleteDoc(doc(db,'formulario-inicio', id))

    export const traer = id => getDoc(doc(db,'formulario-inicio', id))