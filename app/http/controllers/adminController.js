const mongoose = require('mongoose')
const moment = require('moment')
//schema import
const doctorSchema = require('../../models/Doctors')
const docSlotSchema = require('../../models/doctorsSlots')

 
function adminControllers() {
    return {
        //adminDash
        adminDash(req,res){
            res.render('admin/adminDash', {layout: 'layout/adminLayout'})
        },

        //add doctor get
        addDoctorPage(req, res) {
            

        },
        //add doctor post req
        async addDoctorPost(req, res) {
            
            const findDoctor = await doctorSchema.findOne({ doctorsReg: req.body.doctorsReg })
            if (!findDoctor) {
                const newDoctor = new doctorSchema({
                    doctorName: req.body.doctorName,
                    doctorsReg: req.body.doctorsReg,
                    doctorSpeacialization: req.body.doctorSpeacialization

                })
                try {
                    
                    const postDoctor = await newDoctor.save()
                    if(postDoctor){
                        res.json({message: "posted doc"})
                    }
                    else{
                        res.json({message: "not posted doc"})
                    }

                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                res.json({message: 'doc exist'})

            }

        },
        //add slots of doctor page (get)
        async addSlots(req,res){
            const allDoctors = await doctorSchema.find({})
            res.render('admin/setSlots', {layout: 'layout/adminLayout', doctors: allDoctors})
        },
        //post add slot of docs
        async postSlot(req,res){
            // console.log(req.body);
            // console.log(req.body.slot.startTime);
            let startTimes = moment(req.body.slot.startTime,"hh:mm A").format('hh:mm A')
            let endTimes = moment(req.body.slot.endTime,"hh:mm A").format('hh:mm A')
            let slott = []
            // console.log(moment(startTimes,'hh:mm a').add(10, 'minutes').format('hh:mm A'));
            // console.log(times);

            while(moment(startTimes,'hh:mm a').isBefore(moment(endTimes,'hh:mm a'))){
                let st = moment(startTimes,"hh:mm A").format('hh:mm A')
                let et = moment(startTimes,'hh:mm a').add(20, 'minutes').format('hh:mm A')
                let obj = {
                    startTime: st,
                    endTime: et
                }
                slott.push(obj)
                 
                startTimes = et

            }
            
            const newdocSlot = new docSlotSchema({
                doctor : req.body.doctorid.replace(/\s/g,''),
                offday: req.body.offday,
                slots: slott
            })
            const saveSlots = await newdocSlot.save()
            if(saveSlots){
                console.log('slot saved');
            }
        }
    }
}

module.exports = adminControllers