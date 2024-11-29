const Captain = require('../models/captain.model');

const register = async (captainData) => {
    const {first_name, last_name, contact_number, email, password, vehicle} = captainData; 
    if(!first_name || !last_name || !contact_number || !email || !password || !vehicle){
        throw new Error("All data is required"); 
    }

    const existingCaptain = await Captain.findOne({email}); 
    if(existingCaptain){
        throw new Error("Email already exists"); 
    }

    const captain = new Captain({
        full_name:{
            first_name, 
            last_name
        }, 
        email, 
        password,
        contact_number,  
        vehicle: { ...vehicle }
    }); 
    await captain.save();
    
    const captainWithoutPassword = await Captain.findById(captain._id).select('-password');
    return captainWithoutPassword; 
}

const login = async (captainData) => {
    const {email, password} = captainData; 
    if(!email || !password){
        throw new Error("Email and Password are required"); 
    }
    const existingCaptain = await Captain.findOne({email}).select('+password');; 
    if(!existingCaptain){
        throw new Error("User not found"); 
    }

    const isCorrect = await existingCaptain.comparePassword(password); 
    if(!isCorrect){
        throw new Error("Invalid Credentials"); 
    }

    const captain = await Captain.findById(existingCaptain._id).select('-password');
    return captain;
}

module.exports = { register, login };