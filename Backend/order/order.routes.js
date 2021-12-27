const Order = require('./order.controller');
module.exports = (router)=>{
    router.post('/createorder', Order.createOrder);
    router.post('/allorders', Order.allOrders);
    router.post('/readorder', Order.readOrder);
    router.post('/modifyorder', Order.modifyOrder);
    router.post('/deleteorder', Order.deleteOrder);
}