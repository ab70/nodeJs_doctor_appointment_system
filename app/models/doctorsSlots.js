const mongoose = require('mongoose')
const doctorSchema = require('../models/Doctors')
const DoctorSlots = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctors' ,},
    offday: { type: String, default: 'friday'  },
    slots: [{
            startTime: {type: String, },
            endTime: { type: String, },
            status: {type: String, default: "active"   
        }   //this is the object that i want to ref
    }]
},{timestamps: true})

const slotSchema = mongoose.model('doctorslot',DoctorSlots)
module.exports = slotSchema