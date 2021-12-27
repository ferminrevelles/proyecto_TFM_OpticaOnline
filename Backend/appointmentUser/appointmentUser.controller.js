const AppointmentUser = require('./appointmentUser.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '1234';
const server = require('../config/properties');
const AppointmentSchema = require('./appointmentUser.model');


exports.readAppointmentUser = (req, res, next)=> {
    AppointmentUser.find((err,appointmentExists)=>{
        if (err) return res.status(500).send('Server error!');
        if (!appointmentExists){
            // email no es correcto
            res.status(409).send({message: 'Something is wrong'});
        }else{
            // response Frontend
            res.send({appointmentExists});
        }
    });
}

exports.createAppointmentUser = (req,res,next)=> {
    const newAppointmentUser ={
        appointmentUser: req.body.appointmentUser,
    }
        AppointmentUser.create (newAppointmentUser,(err,appointment)=>{
            if (err && err.code===11000) return res.status(409).send('Usuario ya tiene una cita');
            if (err) return res.status(500).send('Server error');
            const expiresIn = 24*60*60;
            const accessToken = jwt.sign({id: appointment.id},
                SECRET_KEY,{
                    expiresIn: expiresIn
                });
                const dataAppointmentUser = {
                    appointmentUser: appointment.appointmentUser,
                }
            // response Frontend
            res.send({dataAppointmentUser});
        });
}

exports.deleteAppointmentUser = (req, res, next)=> {
    const deleteappointmentUser ={
        appointmentUser: req.body.appointmentUser,
    }
    
    AppointmentUser.deleteOne({appointmentUser: deleteappointmentUser.appointmentUser},(err,appointmentUserExist)=>{
        if (err) return res.status(500).send('Server error!');
        if (!appointmentUserExist){
            res.status(409).send({message: '/deleteappointmentuser does not exist'});
        }else{
             //console.log("Borrado");
            res.send("Delete appointmentUser");
        }
    });
}
