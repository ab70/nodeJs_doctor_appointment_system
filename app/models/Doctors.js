const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
    doctorName: {type: String, required: true },
    doctorsReg: {type: Number, required: true, unique: true },
    doctorSpeacialization: { type: String, required: true },
    
},{timestamps: true})

const docSchema = mongoose.model('Doctors', DoctorSchema)
module.exports = docSchema