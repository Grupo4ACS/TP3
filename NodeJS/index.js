const express = require('express');
const bodyParser = require('body-parser');
//Importamos esto para hacer el post request cuando apretamos el boton submit para insertar un nuevo empleado.
//Sin habilitar el cors, la aplicación web va a bloquear los request de otra aplicación web que esté alojada en 
//un dominio o número de puerto diferente.
const cors = require('cors');

const { mongoose } = require('./db.js');
var empleadoController = require('./controllers/empleadoController.js'); 

var app = express();
app.use(bodyParser.json());
//Con esta funcion le decimos que no bloquee los request que vienen de este dominio (localhost:4200)
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => console.log('Servidor arrancado en el puerto 3000.. anda al navegador y entra a http://localhost:3000/empleados'));

app.use('/empleados', empleadoController);