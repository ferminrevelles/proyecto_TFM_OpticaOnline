const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    numOrder: {             //Número de pedido
        type: Number,
        required: true,
        unique: true
    },
    order: {                //Contiene los distintos artículos pedidos en el artículo
        type: [],       //Array con los distintos productos del pedido.
        required: true,
        trim: true
    },
    carrier: {              //Transportista elegido
        type: String,
        required: true,
        trim: true
    },
    total: {                //Total del pedido incluyendo los gastos de envío
        type: Number,
        required: true
    },
    pay: {                  //Si el pedido es pagado o no. Esta variable indica si la pasarela de pago indica si el pago se ha realizado correctamente o no
        type: Boolean,
        required: true
    },
    send: {                  //Estado de envío del pedido
        type: Boolean,
        required: true
    },
    infoAdd: {              //Información que puede añadir el cliente al pedido para notificarlo al vendedor.
        type: String,
        trim: true
    },
    user: {                 //Usuario logueado que ha solicitado el pedido
        type: JSON,
        required: true,
        trim: true,
    }
},{
    timestamps: true
});

module.exports = orderSchema;