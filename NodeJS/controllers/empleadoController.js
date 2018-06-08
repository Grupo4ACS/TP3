const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Empleado } = require('../models/empleado');

//Devuelve la coleccion de empleados
//Para ejecutar éste GET:
//localhost:3000/empleados/
router.get('/', (req, res) => {
    Empleado.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error en la devolución de empleados.. mal ahí: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//Primero, valida el id que se le pasa en req con el método isValid del objeto ObjectId que importamos de mongoose.
//Despues, en caso de ser correcto el id que se le pasa, hace un findById, que devuelve lo mismo que el metodo find de arriba.
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontraron registros para el id requerido : ${req.params.id}`);
    Empleado.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error en la devolución de empleados: ' + JSON.stringify(err, undefined, 2));
        }
    });
})

router.post('/', (req, res) => {
    var emp = new Empleado({
        nombre: req.body.nombre,
        posicion: req.body.posicion,
        localidad: req.body.localidad,
        salario: req.body.salario
    });
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error al guardar empleado: ' + JSON.stringify(err, undefined, 2));
        }
    })
});

//Primero se valida la id que se le pasa al igual que en el metodo get anterior
//Si es valida, se puede continuar con la operacion update, para lo que se crea un nuevo objeto empleado.
//Una vez que se tiene el json creado con los datos del empleado, se hace un findById con el id que se pasa en req, y se updatea el registro con dicha id mediante el comando de mongo { $set, emp }.
//Con la opcion { new: [boolean] } indicamos si se quiere retornar (en el parametro res que se devuelve) toda la data del empleado o solo la updateada.
//En el caso { new: true } le decimos que queremos que queremos solo la data modificada.
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontraron registros para el id requerido : ${req.params.id}`);

    var emp = {
        nombre: req.body.nombre,
        posicion: req.body.posicion,
        localidad: req.body.localidad,
        salario: req.body.salario,
    };
    Empleado.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error en actualización: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontraron registros para el id requerido : ${req.params.id}`);
    Empleado.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error en borrado: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;