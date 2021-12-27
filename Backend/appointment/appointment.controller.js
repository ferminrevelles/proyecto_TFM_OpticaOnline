const Appointment = require('./appointment.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '1234';
const server = require('../config/properties');
const AppointmentSchema = require('./appointment.model');


exports.allAppointment = (req, res, next)=> {
    Appointment.find((err,appointmentExists)=>{
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

exports.createAppointment = (req,res,next)=> {
    const newAppointment ={
        appointment: req.body.appointment,
        hourAndUser: req.body.hourAndUser,
    }
    console.log(newAppointment);
    Appointment.findOne({appointment: newAppointment.appointment},(err, appointmentExist)=>{
        if (err) return res.status(500).send('Server error!');
        if (appointmentExist){     //Modificar el existente.
            if(newAppointment.appointment,appointmentExist.appointment){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: appointmentExist.id}, SECRET_KEY, {expiresIn:expiresIn});
                var myquery = {appointment: appointmentExist.appointment};
                var newvalues = {$set:newAppointment};
                Appointment.updateOne(myquery,newvalues, function(err,res){
                    if(err) throw err;
                    console.log("Actualizado");
                })
                // response Frontend
                res.send({newAppointment});
            }else{
                res.status(409).send({message: 'Something is wrong'});
            }
        }else{      //Si no existe se crea uno nuevo.
            Appointment.create (newAppointment,(err,appointment)=>{
        
                if (err && err.code===11000) return res.status(409).send('Pedido exist');
                if (err) return res.status(500).send('Server error');
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: appointment.id},
                    SECRET_KEY,{
                        expiresIn: expiresIn
                    });
                    const dataAppointment = {
                        appointment: appointment.appointment,
                        hourAndUser: appointment.hourAndUser,
                    }
                // response Frontend
                res.send({dataAppointment});
            });
        }
    });
}

exports.readAppointment = (req, res, next)=> {
    const appointmentappointmentExist ={
        appointment: req.body.appointment,
    }
    Appointment.findOne({appointment: appointmentappointmentExist.appointment},(err, appointmentExit)=>{
        if (err) return res.status(500).send('Server error!');
        if (!appointmentExit){
        //    res.status(409).send({message: 'appointmentExist does not exist'});
        const dataAppointment = {
            appointment: appointmentappointmentExist.appointment,
            hourAndUser: [],
        }
            res.send({dataAppointment});
        }else{
            if(appointmentappointmentExist.appointment,appointmentExit.appointment){
                const dataAppointment = {
                    appointment: appointmentExit.appointment,
                    hourAndUser: appointmentExit.hourAndUser,
                }
            // response Frontend
            res.send({dataAppointment});
            }else{
                // El pass no es correcto
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.modifyAppointment = (req, res, next)=> {
    const modifyappointment ={
        appointment: req.body.day,
        delHour: req.body.delHour,
    }
    
    Appointment.findOne({appointment: modifyappointment.appointment},(err,appointmentExist)=>{
        if (err) return res.status(500).send('Server error!');
        if (!appointmentExist){
            // email no es correcto
            res.status(409).send({message: 'appointmentExist does not exist'});
        }else{
            if(modifyappointment.appointment,appointmentExist.appointment){
                var newHours = appointmentExist.hourAndUser.filter(element=>{
                    return element.hour!==modifyappointment.delHour;
                });
                const newAppointment = appointmentExist;
                newAppointment.hourAndUser=newHours;
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: appointmentExist.id}, SECRET_KEY, {expiresIn:expiresIn});
                var myquery = {appointment: appointmentExist.appointment};    
                var newvalues = {$set:newAppointment};
                Appointment.updateOne(myquery,newvalues, function(err,res){
                    if(err) throw err;
                    console.log("Actualizado");
                })
                // response Frontend
                res.send({newAppointment});
            }else{
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.deleteAppointment = (req, res, next)=> {
    const deleteappointmentExist ={
        appointment: req.body.day,
        hour: req.body.delHour
    }
    res.send("Hola");
}