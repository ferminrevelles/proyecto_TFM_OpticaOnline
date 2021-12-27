const AppointmentUser = require('./appointmentUser.controller');
module.exports = (router)=>{
    router.post('/createappointmentuser', AppointmentUser.createAppointmentUser);
    router.post('/readappointmentuser', AppointmentUser.readAppointmentUser);
    router.post('/deleteappointmentuser', AppointmentUser.deleteAppointmentUser);
}