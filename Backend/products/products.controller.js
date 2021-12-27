const Product = require('./products.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '1234';
const server = require('../config/properties');
const productSchema = require('./products.model');


exports.allProducts = (req, res, next)=> {
    Product.find((err,product)=>{
        if (err) return res.status(500).send('Server error!');
        if (!product){
            // email no es correcto
            res.status(409).send({message: 'Something is wrong'});
        }else{
            // response Frontend
            res.send({product});
        }
    });
}

exports.createProduct = (req,res,next)=> {
    imgUrl:String;
    if (req.body.imgUrl){
        this.imgUrl = `${server.SERVER}/uploads/${req.body.imgUrl}`;
    }else{
        this.imgUrl = `${server.SERVER}/uploads/default.jpg`;
    }
    
    const newProduct ={
        typeProduct: req.body.typeProduct,
        brand: req.body.brand,
        model: req.body.model,
        size: req.body.size,
        description: req.body.description,
        price: req.body.price,
        imgUrl: this.imgUrl
    }


    Product.create (newProduct,(err,product)=>{
        if (err && err.code===11000) return res.status(409).send('Product exist');
        if (err) return res.status(500).send('Server error');
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id: product.id},
            SECRET_KEY,{
                expiresIn: expiresIn
            });
            const dataProduct = {
                typeProduct: product.typeProduct,
                brand: product.brand,
                model: product.model,
                size: product.size,
                description: product.description,
                price: product.price,
                imgUrl: product.imgUrl,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
        // response Frontend
        res.send({dataProduct});
    });
}



exports.readProduct = (req, res, next)=> {
    const userProduct ={
        model: req.body.model
    }

    Product.findOne({model: userProduct.model},(err,product)=>{
        if (err) return res.status(500).send('Server error!');
        if (!product){
            // email no es correcto
            res.status(409).send({message: 'Something is wrong'});
        }else{
            if(userProduct.model,product.model){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: product.id}, SECRET_KEY, {expiresIn:expiresIn});
                const dataProduct = {
                    _id: product._id,
                    typeProduct: product.typeProduct,
                    brand: product.brand,
                    model: product.model,
                    size : product.size,
                    description : product.description,
                    price: product.price,
                    imgUrl: product.imgUrl,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
            // response Frontend
            res.send({dataProduct});
            }else{
                // El pass no es correcto
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.modifyProduct = (req, res, next)=> {
    imgUrl:String;
    if (req.body.imgUrl){
        this.imgUrl = `${server.SERVER}/uploads/${req.body.imgUrl}`;
    }else{
        this.imgUrl = `${server.SERVER}/uploads/default.jpg`;
    }

    const modifyProduct ={
        typeProduct: req.body.typeProduct,
        brand: req.body.brand,
        model: req.body.model,
        size: req.body.size,
        description: req.body.description,
        price: req.body.price,
        imgUrl: this.imgUrl
    }
    
    Product.findOne({model: modifyProduct.model},(err,product)=>{
        if (err) return res.status(500).send('Server error!');
        if (!product){
            // email no es correcto
            res.status(409).send({message: 'Model dont exist'});
        }else{
            if(modifyProduct.model,product.model){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: product.id}, SECRET_KEY, {expiresIn:expiresIn});
                var myquery = {model: product.model};
                var newvalues = {$set:modifyProduct};
                Product.updateOne(myquery,newvalues, function(err,res){
                    if(err) throw err;
                //    console.log("Actualizado");
                })
                // response Frontend
                res.send({modifyProduct});
            }else{
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.deleteProduct = (req, res, next)=> {
    const deleteProduct ={
        model: req.body.model,
    }
    
    Product.deleteOne({model: deleteProduct.model},(err,product)=>{
        if (err) return res.status(500).send('Server error!');
        if (!product){
            res.status(409).send({message: 'Model dont exist'});
        }else{
             //console.log("Borrado");
            res.send("Delete Product");
        }
    });
    
}

exports.readTypeProduct = (req, res, next)=> {
    const type ={
        typeProduct: req.body.typeProduct
    }
    Product.find({typeProduct: type.typeProduct},(err,product)=>{
        if (err) return res.status(500).send('Server error!');
        if (!product){
            // Error en consulta
            res.status(409).send({message: 'Something is wrong'});
        }else{
            if(product){
            // response Frontend
            res.send({product});
            }else{
                // No producto
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}


exports.uploadImage = (req, res, next)=> {
     res.send('uploader');
}