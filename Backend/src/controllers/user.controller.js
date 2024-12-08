const blackListModel = require('../models/blackList.model');
const userService = require("../services/user.service");

exports.registerUser = async (req, res) => {
    const userData  = req.body; 
    if(!userData){
        return res.status(400).json("No data found"); 
    }
    try {
        const user = await userService.register(userData);
        const token = user.generateAuthToken()
        res.cookie('token', token); 
        res.status(200).json({user,token});   
    } catch (error) {
        res.status(400).json({error: error.message}); 
    } 
}; 

exports.loginUser = async (req,res) => {
    const userData = req.body; 
    if(!userData){
        return res.status(400).json("No data found"); 
    }
    try {
        const user = await userService.login(userData);
        const token = user.generateAuthToken();
        res.cookie('token', token);
        console.log(user.email); 
        res.status(200).json({user, token, message: `userData sent ${user.email}`}); 
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}

exports.getUserProfile = async (req, res) => {
    res.status(200).json(req.user); 
}

exports.logoutUser = async (req, res) => {
    res.clearCookie('token'); 
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]; 

    await blackListModel.create({token}); 

    res.status(200).json({message: "Logged out"}); 
}