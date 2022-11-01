//--Server JS--
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();                  //here it returns a object of express module
const ejs = require('ejs');             //imported the ejs template engine
const path = require('path');           //inbuilt node js path finder of folders
const expressLayout = require('express-ejs-layouts');  //imported express-ejs template engine
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt =  require('jsonwebtoken');
const flash = require('express-flash');    //without flash set-cookie header was not working 
const session = require('express-session')
const  MongoDbStore = require('connect-mongo');     //imp for session store to mongodb
const axios = require('axios');


//configs dotenv file(.env)
dotenv.config()

//db configue 
const PORT = process.env.PORT || 5000;  //checks process if any port availablein (.env)  or use 5000
const connection = mongoose.connect(process.env.Mongoose_connect,{useNewUrlParser: true, useUnifiedTopology: true});
app.listen(PORT , ()=>{
    console.log(`Listening on ports ${PORT}`)
})




//session setup with cookie
app.use(session({
    secret: process.env.SECRET_key,
    resave: false,
    store :  MongoDbStore.create({
        mongoUrl: process.env.Mongoose_connect
    }),           //session storage path 
    saveUninitialized: false,
    cookie : {maxAge: 1000 * 60 * 2 }  //1 hr max age
}))


//cookie parser user
app.use(cookieParser());
app.use(flash())
//set template engine
app.use(expressLayout);

//global middleware to use local variables in routes
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})


//set public folder
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname,'/resources/views'));                  //sets views path in folder
app.set('layout',path.join(__dirname,'/resources/views/layout/layout'));   //sets layout path for express in folder
app.set('view engine','ejs');                   //sets view engine as ejs

//includes routes(web.js)
require('./routes/web')(app);





