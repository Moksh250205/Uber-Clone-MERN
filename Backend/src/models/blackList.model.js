const mongoose = require("mongoose"); 

const blackListTokenScheme = new mongoose.Schema({
    token:{
        type: String, 
        required: true, 
        unique: true, 
    }, 
    createdAt:{
        type: Date, 
        default: Date.now(), 
        expires: 86400 // converted 24 hours in seconds. 
    }
})

module.exports = mongoose.model('BlacklistToken', blackListTokenScheme)