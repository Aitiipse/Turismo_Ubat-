const { storage, auth } = require('./firebaseCloud');
const { db } = require('./firebase');
const {
  browserSessionPersistence,
  setPersistence,
} = require('firebase/auth');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

setPersistence(auth, browserSessionPersistence);

const user = auth.currentUser;
const userEmail = user;

class envioImg {
  getDate() {
    let date = new Date();
    let fecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return fecha;
  }

  sendImages(files, callback, data) {
    console.log(files);
    if (files !== undefined) {
      const storageRef = ref(
        storage,
        'noticias/' + new Date().getTime() + files.originalname
      );
      const metadata = {
        contentType: files.mimetype,
      };
      uploadBytes(storageRef, files.buffer, metadata)
        .then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath))
            .then((url) => {
              callback(data, url);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  sendImagesPerfil(files, id, callback) {
    const storageRef = ref(
      storage,
      'perfil/' + new Date().getTime() + files.originalname
    );
    const metadata = {
      contentType: files.mimetype,
    };
    uploadBytes(storageRef, files.buffer, metadata)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath))
          .then((url) => {
            let data = {
              photo: url,
            };
            callback("users", id, data)
              .then((result) => {})
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async enviarPublication(data, url, res) {
    let fecha = new envioImg();
    data.updatedAt = fecha.getDate();
    data.url = url;
    data.iduser = userEmail;

    const nombre = data.titular;
    const querySnapshot = await db.collection('noticias').where('titular', '==', nombre).get();

    if (!querySnapshot.empty) {
      const mensajeError = 'Ya existe un registro con el mismo nombre.';
    //   return res.send(`<script>alert("${mensajeError}"); window.history.back();</script>`);
    }

    const publication = await db.collection('noticias').add(data);
    console.log(publication.id);
    return publication.id;
  }

  async editData(id, url) {
    const dataupdate = db.collection("noticias").doc(id);
    await dataupdate.update({ url: url });
  }
}

module.exports = envioImg;
