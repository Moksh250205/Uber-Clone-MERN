const captainService  = require('../services/captain.service'); 
const blackListTokenModel = require('../models/blackList.model'); 


exports.registerCaptain = async (req, res) => {
    const captainData = req.body; 
    if(!captainData){
        return res.status(400).json("No data found"); 
    }
    try {
        const captain = await captainService.register(captainData); 
        const token = captain.generateAuthToken(); 
        res.cookie('token', token, { httpOnly: true, secure: true }); 
        res.status(200).json({captain, token, message: "Captan registered successfully"})
    } catch (error) {
        res.status(400).json({message: error.message}); 
    }
}

exports.loginCaptain= async (req,res) => {
    const captainData = req.body; 
    console.log(captainData); 
    if(!captainData){
        return res.status(400).json("No data found"); 
    }
    try {
        const captain = await captainService.login(captainData);
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({captain, token}); 
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}

exports.getCaptainProfile = async (req, res) => {
    console.log(req.captain); 
    res.status(200).json({ captain: req.captain });
}

exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}