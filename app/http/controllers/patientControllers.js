const mongoose = require('mongoose')
const moment = require('moment')
//schema import
const doctorSchema = require('../../models/Doctors')
const docSlotSchema = require('../../models/doctorsSlots')
const appointmentScehma = require('../../models/Appointment')

function patientControllers(){
    return{
        //get patient dashboard
        patientDash(req,res){
            res.render('user/dashboard', {layout: 'layout/patientLayout'})
        },
        //apointment page get
        async appointmentPatient(req,res){
            try{

                const docwithSlot = await docSlotSchema.find({}).populate('doctor')
                const allDoctors = await doctorSchema.find({})
                let docCat = []
                
                allDoctors.forEach(e => {
                    docCat.push(e.doctorSpeacialization)
                });
                let newCat = [...new Set(docCat)]
                
                res.render('user/appointment', {layout: 'layout/patientlayout', docs: newCat, allDoc: docwithSlot})

            }
            catch(err){

            }
            
        },
        //search doctor by category
        async searchDoctorbyCat(req,res){
            try{
                const allDoctors = await doctorSchema.find({})
                const searcheddocs = await docSlotSchema.find().populate({path: 'doctor', match:{doctorSpeacialization: req.body.doctorcat}})
                let filteredData = []
                let docCat = []
                allDoctors.forEach(e => {
                    docCat.push(e.doctorSpeacialization)
                });
                let newCat = [...new Set(docCat)]
                searcheddocs.forEach(e => {
                    if(e.doctor===null){
    
                    }
                    else{
                        filteredData.push(e)
                    }
                });
                res.render('user/appointment', {layout: 'layout/patientLayout', docs: newCat, allDoc: filteredData})
                
                
            }
            catch(err){
                console.log(err);
            }
        },
        //appointment deatils page
        async appointmentDetails(req,res){
            
            // console.log(req.query.id);
            var sid = mongoose.Types.ObjectId(req.query.id);
            
            // var sid = mongoose.isObjectIdOrHexString(req.params.id)
            try{    
                const detailedSlot = await docSlotSchema.find({doctor:sid}).populate('doctor')
                
                res.render('user/appointmentdetails',{layout: 'layout/patientLayout', docdeatils: detailedSlot})

            } 
            catch(err){
                console.log(err);
            }
            
            
           
        },
        //post a appointment req
        async postAppointment(req,res){
            const newAppointment = new appointmentScehma({
                userDetails: mongoose.Types.ObjectId(req.body.patientId),
                doctorDetails: mongoose.Types.ObjectId(req.body.doctorId),
                appointmentDate: req.body.advancedate,
                pickedTime: mongoose.Types.ObjectId(req.body.pickedTime)
            })
            
            try{
                
                const saveAppointment = await newAppointment.save()
                if(saveAppointment){
                    res.json({status: 200, message: 'Saved your appointment'})
                }
                else{
                    res.json({status: 501, message: "Could not make appointment"})
                }

            }
            catch(err){
                res.json({status: 500, message: err})
            }
        },
        //show all my(patients)appointments
        
    }
}
module.exports = patientControllers