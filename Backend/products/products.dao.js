const mongoose = require('mongoose');
const productSchema = require ('./products.model');

productSchema.statics ={
    create : function (data, cb){
        const product = new this(data);
        product.save(cb);
    },
    read: function (query, cb){
        this.find(query,cb);
    }
}

const productsModel = mongoose.model('Products',productSchema);
module.exports = productsModel;