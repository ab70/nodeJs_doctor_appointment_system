const mongoose = require('mongoose')
const moment = require('moment')

const AppointmentSchema = new mongoose.Schema({
    userDetails: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true },
    doctorDetails: { type: mongoose.Schema.Types.ObjectId,ref: 'Doctors' ,required: true },
    appointmentDate: {type: Date, required: true, default: moment().format('YYYY-MM-DD')},
    appointTime: {
        time: {
             type: mongoose.Schema.Types.ObjectId, ref: 'doctorslot' 
            } //here i want to ref that slot objcet id inside that array
         
    }
}, {timestamps: true})

const appointmentSchema = mongoose.model('appointment', AppointmentSchema)
module.exports = appointmentSchema