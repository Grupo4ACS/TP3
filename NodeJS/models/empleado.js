const mongoose = require('mongoose');

var Empleado = mongoose.model('Empleado', {
    nombre: { type: String },
    posicion: { type: String },
    localidad: { type: String },
    salario: { type: Number }
});

module.exports = { Empleado };