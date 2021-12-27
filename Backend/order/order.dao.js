const mongoose = require('mongoose');
const orderSchema = require ('./order.model');

orderSchema.statics ={
    create : function (data, cb){
        const order = new this(data);
        order.save(cb);
    },
    read: function (query, cb){
        this.find(query,cb);
    }
}

const productsModel = mongoose.model('Orders',orderSchema);
module.exports = productsModel;