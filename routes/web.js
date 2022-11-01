//controllers import
const homeControllers = require('../app/http/controllers/homeControllers')
const authControllers = require('../app/http/controllers/authControllers')
const adminControllers = require('../app/http/controllers/adminController')

function initRoutes(app) {

    app.get('/', homeControllers().home )
    app.get('/login', authControllers().loginPage )
    app.get('/signup', authControllers().signupPage)
    app.get('/adminseed', authControllers().seedAdmin)
    app.post('/signup',authControllers().signupPost)
    
    app.get('/addDoctor',adminControllers().addDoctorPage)
    app.get('/addslot',adminControllers().addSlots)
    app.post('/addDoctor',adminControllers().addDoctorPost)

    app.get('/admin', adminControllers().adminDash)
    app.post('/setDocSlot', adminControllers().postSlot)
    

}

module.exports = initRoutes