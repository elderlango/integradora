

const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    type: String,
    messageType: {
        type: String,
        enum: ['Alerta', 'Advertencia', 'Error'],
    },
    message: String,
});

const Sensores_Integradora = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('Sensores', Sensores_Integradora);
module.exports = mongoose.model('alerta', AlertSchema);
