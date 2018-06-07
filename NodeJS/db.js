const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', (err) => {
    if (!err)
        console.log('Mongo conecto exitosamente');
    else
        console.log('Error.. Se rompio algo: ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;
