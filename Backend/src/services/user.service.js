const User = require('../models/user.model');

const register = async (userData) => {
    const {first_name, last_name, email, password } = userData; 
    if(!first_name || !last_name  || !email || !password){
        throw new Error("All data is required"); 
    }

    const existingUser = await User.findOne({email}); 
    if(existingUser){
        throw new Error("Email already exists"); 
    }

    const user = new User({
        full_name:{
            first_name, 
            last_name
        }, 
        email, 
        password, 
    }); 
    await user.save();
    
    const userWithoutPassword = await User.findById(user._id).select('-password');
    return userWithoutPassword; 
}

const login = async (userData) => {
    const {email, password} = userData; 
    if(!email || !password){
        throw new Error("Email and Password are required"); 
    }
    const existingUser = await User.findOne({email}).select('+password');; 
    if(!existingUser){
        throw new Error("User not found"); 
    }

    const isCorrect = await existingUser.comparePassword(password); 
    if(!isCorrect){
        throw new Error("Invalid Credentials"); 
    }

    const user = await User.findById(existingUser._id).select('-password');
    return user;
}

module.exports  = { register, login }; 