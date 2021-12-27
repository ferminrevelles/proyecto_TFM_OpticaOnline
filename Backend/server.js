'use strict'
const cors = require('cors');
const pather = require('path');
const authRoutes = require('./auth/auth.routes');
const productsRoutes = require('./products/products.routes');
const orderRoutes = require('./order/order.routes');
const appointmentRoutes = require('./appointment/appointment.routes');
const appointmentUserRoutes = require('./appointmentUser/appointmentUser.routes');
const express = require('express');
const properties = require('./config/properties');
const DB = require('./config/db');
const multer = require('multer');

//init DB
DB();
const app = express();


const storage = multer.diskStorage({
    destination: pather.join(__dirname,'public/uploads'),
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    }
});
//middelewares
app.use(multer({
    storage: storage,
    dest: 'public/uploads'
}).single('imgUrl'));

//middelewares
/*app.use(multer({
    storage: storage,
    dest: 'public/uploads'
}).single('imgUrlUser'));*/

const router = express.Router();

const bodyParser = require('body-parser');
const { path } = require('./auth/auth.model');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors());



app.use('/api',router);

authRoutes(router);
router.get('/',(req,res)=>{
    res.send('Hello from Backend Optica San Cristobal');
});

productsRoutes(router);
router.get('/',(req,res)=>{
    res.send('Hello from Backend Optica San Cristobal');
});

orderRoutes(router);
router.get('/',(req,res)=>{
    res.send('Hello from Backend Optica San Cristobal');
});

appointmentRoutes(router);
router.get('/',(req,res)=>{
    res.send('Hello from Backend Optica San Cristobal');
});

appointmentUserRoutes(router);
router.get('/',(req,res)=>{
    res.send('Hello from home');
});

app.use(router);

// Permitir el acceso a los datos publicos del servidor.
app.use(express.static('public'));  
//app.use('/public', express.static(`${__dirname}/storage/img`));

app.listen(properties.PORT,()=> console.log(`Server running on port ${properties.PORT}`));