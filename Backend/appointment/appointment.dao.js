const mongoose = require('mongoose');
const orderSchema = require ('./appointment.model');

orderSchema.statics ={
    create : function (data, cb){
        const order = new this(data);
        order.save(cb);
    },
    read: function (query, cb){
        this.find(query,cb);
    }
}

const appointmentModel = mongoose.model('Appointment',orderSchema);
module.exports = appointmentModel;