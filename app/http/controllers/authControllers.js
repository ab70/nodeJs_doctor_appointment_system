//dependencies
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')


//import models
const admins = require('../../models/seedData')
const userSchema = require('../../models/User')


function authControllers(){
    return{
        //login page get
        loginPage(req,res){
            res.render('login')
        },


        //signup page get
        signupPage(req,res){

            res.render('signup')
        },


        //signup user post
        async signupPost(req,res){
            try{
                const user = await userSchema.findOne({userEmail:req.body.userEmail})

                if(user){
                    res.status(403).redirect('/login')   //already exists email res
                }
                if(!user){
                    const newuser = new userSchema(
                        {
                            userName: req.body.userName,
                            userEmail  : req.body.userEmail,                    
                            userPass  :   CryptoJS.AES.encrypt(req.body.userPass, process.env.SECRET_key),                  
                            userAddress  : req.body.userAddress, 
                                
                        }
                    ) 
                    const postUser = await newuser.save()
                    if(postUser){
                        res.status(200).redirect('/signup') //signup succ
                    }
                    else{
                        res.status(422).redirect('/signup')  //data arrived but failed to signup
                    }   
                }
            }
            catch(err){
                res.status(500).redirect('/signup')   //internal server error
            } 
        },
        //seed admin
        async seedAdmin(req,res){
            

            try{
                await userSchema.insertMany(admins)
                res.redirect('/')
            }
            catch(err){
                console.log(err);
            }
        },


    }
}
module.exports = authControllers