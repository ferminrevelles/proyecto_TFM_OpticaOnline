const Users = require('./auth.controller');
module.exports = (router)=>{
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);    
    router.post('/deleteuser', Users.deleteUSer);   
    router.post('/modifyuser', Users.modifyUser);  
    router.post('/allusers', Users.readAllUsers);
    router.post('/ordertemp', Users.orderTemp);   
}