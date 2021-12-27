const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema ({
    appointment: {             //dia de la cita
        type: Date,
        required: true,
        unique: true
    },
    hourAndUser: {                //
        type: [],       //Array con los distintos productos del pedido.
        required: true,
        trim: true
    },
},{
    timestamps: true
});

module.exports = AppointmentSchema;