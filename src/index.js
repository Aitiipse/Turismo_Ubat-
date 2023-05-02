const app = require('./app');
const porte = process.env.PORT || 4000;
let port = app.listen(porte);
console.log('corriendo en el puerto 4000');

