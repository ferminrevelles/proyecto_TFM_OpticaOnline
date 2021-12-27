const Appointment = require('./appointment.controller');
module.exports = (router)=>{
    router.post('/createappointment', Appointment.createAppointment);
    router.post('/readappointment', Appointment.readAppointment);
    router.post('/modifyappointment', Appointment.modifyAppointment);
    router.post('/deleteappointment', Appointment.deleteAppointment);
}