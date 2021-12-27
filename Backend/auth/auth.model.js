const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    typeUser: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        trim: true
    },
    imgUrlUser: {           //Url donde se encontrará la imagen del usuario.
        type: String,
        required: true,
        trim: true
    },
    orderTemp: {                //Contiene los distintos artículos pedidos en el artículo
        type: [],       //Array con los distintos productos del pedido.
        trim: true
    },
},{
    timestamps: true
});

module.exports = userSchema;