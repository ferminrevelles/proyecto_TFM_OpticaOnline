const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '1234';
const server = require('../config/properties');

exports.createUser = (req,res,next)=> {
    
    if (req.body.imgUrlUser){       //URL para indicar lugar de la imagen en el servidor.
        this.imgUrl = `${server.SERVER}/uploads/${req.body.imgUrlUser}`;
    }else{
        this.imgUrl = `${server.SERVER}/uploads/defaultUser.png`;
    }

    const newUser ={
        typeUser: req.body.typeUser,
        name: req.body.name,
        email: req.body.email,
        pass: bcrypt.hashSync(req.body.pass),
        imgUrlUser: this.imgUrl
    }

    User.create (newUser,(err,user)=>{
       
        if (err && err.code===11000) return res.status(409).send('User exist');
        if (err) return res.status(500).send('Server error');
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id: user.id},
            SECRET_KEY,{
                expiresIn: expiresIn
            });
            const dataUser = {
                typeUser: user.typeUser,
                name: user.name,
                email: user.email,
                imgUrlUser: req.body.imgUrlUser,
                accessToken: accessToken,
                expiresIn: expiresIn
            }

        // response Frontend
        res.send({dataUser});
    });
}

exports.loginUser = (req, res, next)=> {
    const userData ={
        email: req.body.email,
        pass:  req.body.pass
    }
    
    User.findOne({email: userData.email},(err,user)=>{
        if (err) return res.status(500).send('Server error!');
        if (!user){
            // email no es correcto
            res.status(409).send({message: 'Something is wrong'});
        }else{
            const resultPass = bcrypt.compareSync(userData.pass,user.pass);
            if(resultPass){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn:expiresIn});
                const dataUser = {
                    typeUser: user.typeUser,
                    name: user.name,
                    email: user.email,
                    imgUrlUser: user.imgUrlUser,
                    orderTemp: user.orderTemp,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
            // response Frontend
            res.send({dataUser});
            }else{
                // El pass no es correcto
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.readAllUsers = (req, res, next)=> {
    const users ={
        typeUser: req.body.typeUser
    }

    User.find({typeUser: users.typeUser},(err,user)=>{
        if (err) return res.status(500).send('Server error!');
        if (!user){
            // email no es correcto
            res.status(409).send({message: 'Something is wrong'});
        }else{
            if(user){
            // response Frontend
            res.send({user});
            }else{
                // El pass no es correcto
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.modifyUser = (req, res, next)=> {
    if (req.body.imgUrlUser!=undefined){
        this.imgUrlUser = `${server.SERVER}/uploads/${req.body.imgUrlUser}`;
    }else{
        this.imgUrlUser = `${server.SERVER}/uploads/defaultUser.png`;
    }

    const modifyUser ={
        name: req.body.name,
        pass: bcrypt.hashSync(req.body.pass),
        email: req.body.email,
        imgUrlUser: this.imgUrlUser
    }
    
    User.findOne({email: modifyUser.email},(err,user)=>{
        if (err) return res.status(500).send('Server error!');
        if (!user){
            // email no es correcto
            res.status(409).send({message: 'User dont exist'});
        }else{
            if(modifyUser.email,user.email){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn:expiresIn});
                var myquery = {email: user.email};
                var newvalues = {$set:modifyUser};
                User.updateOne(myquery,newvalues, function(err,res){
                    if(err) throw err;
                    console.log("Actualizado");
                })
                // response Frontend
                res.send({modifyUser});
            }else{
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.deleteUSer = (req, res, next)=> {
    const deleteUser ={
        email: req.body.email,
    }
    
    User.deleteOne({email: deleteUser.email},(err,user)=>{
        if (err) return res.status(500).send('Server error!');
        if (!user){
            res.status(409).send({message: 'User dont exist'});
        }else{
             //console.log("Borrado");
            res.send("Delete User");
        }
    });
    
    exports.uploadImage = (req, res, next)=> {
        res.send('uploader');
   }
}

exports.orderTemp = (req, res, next)=> {
    const modifyUser ={
        orderTemp: req.body.orderTemp,
        email: req.body.email,
    }
    
    User.findOne({email: modifyUser.email},(err,user)=>{
        if (err) return res.status(500).send('Server error!');
        if (!user){
            // email no es correcto
            res.status(409).send({message: 'User dont exist'});
        }else{
            if(modifyUser.email,user.email){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn:expiresIn});
                var myquery = {email: user.email};
                var newvalues = {$set:modifyUser};
                User.updateOne(myquery,newvalues, function(err,res){
                    if(err) throw err;
                    console.log("Actualizado");
                })
                // response Frontend
                res.send({modifyUser});
            }else{
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}