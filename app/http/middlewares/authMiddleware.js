const jwt = require('jsonwebtoken')
const userSchema = require('../../models/User')


//function
async function getData(id){
    const user = await userSchema.findById(id).select('userName userEmail userType')
    const {userPass, ...others} =user._doc;
    
    return others;
}

const adminAuth =  (req,res,next)=>{
    const token = req.cookies.jwt_token;
    if(token){
        jwt.verify(token,process.env.jsonSec,async (err,decodedToken)=>{
            if (err) {
                console.log('here was error');
                res.redirect('/login')
                req.currentUser = null
            }
            else{
                if (decodedToken.role===process.env.adminRole) {
                    const data = await getData(decodedToken.id)
                    
                    req.currentUser = data
                    console.log(req.currentUser);
                    next()
                }
                else{
                    console.log('its is not admin');
                    res.redirect('/login')
                }
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

const userAuth = (req,res,next)=>{
    const token = req.cookies.jwt_token;
    if(token){
        jwt.verify(token,process.env.jsonSec,async (err,decodedToken)=>{
            if (err) {
                res.redirect('/login')
                req.currentUser = null                
            }
            else{
                if(!(decodedToken.role===process.env.adminRole)){
                    console.log('im here');
                    const data = await getData(decodedToken.id)
                    req.currentUser = data
                    next()
                }
                else{
                    res.redirect('/login')
                }
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

module.exports = {adminAuth, userAuth}