const mongoose = require('mongoose');

// Definir esquemas para los datos y alertas de cada tipo de sensor
const alertSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    message: String,
    messageType: {
        type: String,
        enum: ['Alerta', 'Advertencia', 'Error'],
    },
});

const smokeSchema = new mongoose.Schema({
    parameters: {
        max: { type: Number, required: true } 
    },
    data: [{
        concentration: { type: Number }, 
        timestamp: { type: Date, default: Date.now },
    }],
    alerts: [alertSchema],
});

const gasDetectorSchema = new mongoose.Schema({
    parameters: {
        sensitivity: { type: Number, required: true } 
    },
    data: [{
        concentration: { type: Number }, 
        timestamp: { type: Date, default: Date.now },
    }],
    alerts: [alertSchema],
});

const ultrasonicSchema = new mongoose.Schema({
    parameters: {
        range: { type: Number, required: true } 
    },
    data: [{
        distance: { type: Number }, 
        timestamp: { type: Date, default: Date.now },
    }],
    alerts: [alertSchema],
});

const humiditySchema = new mongoose.Schema({
    parameters: {
        max: { type: Number, required: true },
        min: { type: Number, required: true },
    },
    data: [{
        humidity: { type: Number },
        timestamp: { type: Date, default: Date.now },
    }],
    alerts: [alertSchema],
});


const temperatureSchema = new mongoose.Schema({
    parameters: {
        max: { type: Number, required: true },
        min: { type: Number, required: true },
    },
    data: [{
        temperature: { type: Number }, 
        timestamp: { type: Date, default: Date.now },
    }],
    alerts: [alertSchema],
});

// Definir el esquema principal del dispositivo con los esquemas de sensores incorporados
const deviceSchema = new mongoose.Schema({
    sensors: {
        smoke: smokeSchema,
        gasDetector: gasDetectorSchema,
        ultrasonic: ultrasonicSchema,
        humidity: humiditySchema,
        temperature: temperatureSchema,
    },
});

module.exports = mongoose.model('alerta', deviceSchema);