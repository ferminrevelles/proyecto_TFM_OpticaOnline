const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    typeProduct: {      //Tipo de producto
        type: String,
        required: true,
        trim: true
    },
    brand: {            //Marca del producto
        type: String,
        required: true,
        trim: true
    },
    model: {            //Modelo del producto "Será único" como si se tratase de un código de barras
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    size: {             //Cantidad en stock del producto.
        type: Number,
        required: true
    },
    description: {      //Descripción detallada del producto
        type: String,
        required: true,
        trim: true
    },
    price: {            //Precio unitario del producto
        type: Number,
        required: true
    },
    imgUrl: {           //Url donde se encontrará la imagen del producto.
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
});

module.exports = productSchema;