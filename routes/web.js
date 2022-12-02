//controllers import
const homeControllers = require('../app/http/controllers/homeControllers')
const authControllers = require('../app/http/controllers/authControllers')
const adminControllers = require('../app/http/controllers/adminController')
const patientControllers = require('../app/http/controllers/patientControllers')

//middlewares
const {adminAuth, userAuth} =require('../app/http/middlewares/authMiddleware')

function initRoutes(app) {

    app.get('/', homeControllers().home )
    app.get('/login', authControllers().loginPage )
    app.post('/login', authControllers().loginPost)
    app.get('/signup', authControllers().signupPage)
    app.get('/adminseed', authControllers().seedAdmin)
    app.post('/signup',authControllers().signupPost)
    
    //manager or admin routes
    app.get('/admin', adminAuth, adminControllers().adminDash)
    app.get('/addDoctor', adminAuth, adminControllers().addDoctorPage)
    app.get('/addslot',adminControllers().addSlots)
    app.post('/addDoctor',adminControllers().addDoctorPost)
    app.get('/admin', adminControllers().adminDash)
    app.post('/setDocSlot', adminControllers().postSlot)

    //patient controller
    app.get('/patient',userAuth, patientControllers().patientDash)
    app.get('/appointment', patientControllers().appointmentPatient)
    app.post('/appointment', patientControllers().searchDoctorbyCat)
    app.get('/appointDetails', patientControllers().appointmentDetails)
    app.post('/appointmentcheck', patientControllers().postAppointment)
    app.get('/myappointments', )
    app.get('/checkallappointment')
    

}

module.exports = initRoutes