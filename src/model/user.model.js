const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Device = require('./device.model.js'); 
const Admin = require('./admin.model.js'); 

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true // Elimina los espacios al inicio y al final
    },
    lastName: {
        type: String,
        required: true,
        trim: true // Elimina los espacios al inicio y al final
    },
    email: {
        type: String,
        required: true,
        trim: true,  
        unique: true,
        index: true, // Asegura que el campo email esté indexado
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    profilePictureId: {
        type: String,
    },
    role: {
        type: String,
        default: 'monitor',
    },
    devices: [{ // Añadido para listar los dispositivos a los que un usuario está asignado
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }],
    monitoringRequests: [{ // Actualizado para incluir deviceId
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        deviceId: { // Añadido para especificar a qué dispositivo se refiere la solicitud
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    }],
    fcmToken: {
        type: String,
        required: false // this can be optional because not every user may have a token initially
    }
});

// Pre-save hook para encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.pre('save', function(next) {
    if (!this.monitoringRequests.every(request => request.adminId && request.deviceId)) {
        next(new Error('Every monitoring request must have both adminId and deviceId specified.'));
    } else {
        next();
    }
});

userSchema.pre('updateOne', { document: true, query: false }, function(next) {
    if (this._update.monitoringRequests && !this._update.monitoringRequests.every(request => request.adminId && request.deviceId)) {
        next(new Error('Every monitoring request in update must have both adminId and deviceId specified.'));
    } else {
        next();
    }
});


userSchema.pre('save', async function(next) {
    try {
        // Verifica que cada adminId referenciado exista
        for (let request of this.monitoringRequests) {
            const adminExists = await Admin.exists({ _id: request.adminId });
            if (!adminExists) {
                return next(new Error('Admin ID referenced does not exist'));
            }

            const deviceExists = await Device.exists({ _id: request.deviceId });
            if (!deviceExists) {
                return next(new Error('Device ID referenced does not exist'));
            }
        }
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.pre('updateOne', { document: true, query: false }, async function(next) {
    try {
        if (this._update.monitoringRequests) {
            for (let request of this._update.monitoringRequests) {
                const adminExists = await Admin.exists({ _id: request.adminId });
                if (!adminExists) {
                    return next(new Error('Admin ID referenced does not exist'));
                }

                const deviceExists = await Device.exists({ _id: request.deviceId });
                if (!deviceExists) {
                    return next(new Error('Device ID referenced does not exist'));
                }
            }
        }
        next();
    } catch (err) {
        next(err);
    }
});



// Método para comparar contraseñas (útil para autenticación)
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
