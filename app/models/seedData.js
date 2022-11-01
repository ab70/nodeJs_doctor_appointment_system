const CryptoJS = require('crypto-js')
const admins = [
    {
        "userName": "abrar",
        "userEmail": "nurulabrar2369@gmail.com",
        "userPass": CryptoJS.AES.encrypt(process.env.adminPass, process.env.SECRET_key),
        "userAddress": "H:97, R:17",
        "userType": process.env.adminRole
    },
    {
        "userName": "abrar1",
        "userEmail": "nurulabrar11@gmail.com",
        "userPass": CryptoJS.AES.encrypt(process.env.adminPass1, process.env.SECRET_key) ,
        "userAddress": "H:97, R:17",
        "userType": process.env.adminRole
    }

]

module.exports = admins