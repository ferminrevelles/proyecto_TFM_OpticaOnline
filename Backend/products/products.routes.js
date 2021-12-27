const Products = require('./products.controller');
module.exports = (router)=>{
    router.post('/createproduct', Products.createProduct);
    router.post('/readproduct', Products.readProduct);    
    router.post('/allproducts', Products.allProducts);
    router.post('/modifyproduct', Products.modifyProduct);
    router.post('/deleteproduct', Products.deleteProduct);
    router.post('/uploadimage', Products.uploadImage);
    router.post('/typeproduct', Products.readTypeProduct);
}