const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    userEmail  :  {type: String ,required: true, unique: true},
    userPass  :  {type: String ,required: true},
    userAddress  :  {type: String,required: true},
    userType: {type: String, required: true, default: 'user' }, //user or admin

},{timestamps: true})

const userschema = mongoose.model('User', UserSchema)
module.exports = userschema