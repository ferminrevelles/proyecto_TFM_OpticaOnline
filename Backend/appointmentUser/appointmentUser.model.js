const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentUserSchema = new Schema ({
    appointmentUser: {                //
        type: String,       //Array con los distintos productos del pedido.
        required: true,
        unique: true,
    },
},{
    timestamps: true
});

module.exports = AppointmentUserSchema;