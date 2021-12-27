const Order = require('./order.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '1234';
const server = require('../config/properties');
const orderSchema = require('./order.model');


exports.allOrders = (req, res, next)=> {
    Order.find((err,orders)=>{
        if (err) return res.status(500).send('Server error!');
        if (!orders){
            // email no es correcto
            res.status(409).send({message: 'Something is wrong'});
        }else{
            // response Frontend
            res.send({orders});
        }
    });
}

exports.createOrder = (req,res,next)=> {
    const newOrder ={
        numOrder: req.body.numOrder,
        order: req.body.order,
        carrier: req.body.carrier,
        total: req.body.total,
        pay: req.body.pay,
        send: req.body.send,
        infoAdd: req.body.infoAdd,
        user: req.body.user,
    }

    Order.create (newOrder,(err,order)=>{
        if (err && err.code===11000) return res.status(409).send('Pedido exist');
        if (err) return res.status(500).send('Server error');
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id: order.id},
            SECRET_KEY,{
                expiresIn: expiresIn
            });
            const dataOrder = {
                numOrder: order.numOrder,
                order: order.order,
                carrier:order.carrier,
                total: order.total,
                pay: order.pay,
                send: order.send,
                infoAdd: order.infoAdd,
                user: order.user,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
        // response Frontend
        res.send({dataOrder});
    });
}

exports.readOrder = (req, res, next)=> {
    const userOrder ={
        numOrder: req.body.numOrder
    }

    Order.findOne({numOrder: userOrder.numOrder},(err,order)=>{
        if (err) return res.status(500).send('Server error!');
        if (!order){
            // email no es correcto
            res.status(409).send({message: 'order does not exist'});
        }else{
            if(userOrder.numOrder,order.numOrder){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: order.id}, SECRET_KEY, {expiresIn:expiresIn});
                const dataOrder = {
                    numOrder: order.numOrder,
                    order: order.order,
                    carrier:order.carrier,
                    total: order.total,
                    pay: order.pay,
                    send: order.send,
                    infoAdd: order.infoAdd,
                    user: order.user,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
            // response Frontend
            res.send({dataOrder});
            }else{
                // El pass no es correcto
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.modifyOrder = (req, res, next)=> {
    const modifyOrder ={
        numOrder: req.body.numOrder,
        order: req.body.order,
        carrier: req.body.carrier,
        total: req.body.total,
        pay: req.body.pay,
        send: req.body.send,
        infoAdd: req.body.infoAdd,
        user: req.body.user
    }
    
    Order.findOne({numOrder: modifyOrder.numOrder},(err,order)=>{
        if (err) return res.status(500).send('Server error!');
        if (!order){
            // email no es correcto
            res.status(409).send({message: 'order does not exist'});
        }else{
            if(modifyOrder.numOrder,order.numOrder){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: order.id}, SECRET_KEY, {expiresIn:expiresIn});
                var myquery = {numOrder: order.numOrder};
                var newvalues = {$set:modifyOrder};
                Order.updateOne(myquery,newvalues, function(err,res){
                    if(err) throw err;
                //    console.log("Actualizado");
                })
                // response Frontend
                res.send({modifyOrder});
            }else{
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.deleteOrder = (req, res, next)=> {
    const deleteOrder ={
        numOrder: req.body.numOrder,
    }
    Order.deleteOne({numOrder: deleteOrder.numOrder},(err,order)=>{
        if (err) return res.status(500).send('Server error!');
        if (!order){
            res.status(409).send({message: 'Order does not exist'});
        }else{
             //console.log("Borrado");
            res.send("Delete Order");
        }
    });
}