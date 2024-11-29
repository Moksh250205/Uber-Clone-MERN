const blackListModel = require('../models/blackList.model');
const jwt = require('jsonwebtoken'); 

exports.authUser = async  (req, res, next) => {

    const authHeader = req.headers.authorization;

    const token = req.cookies.token || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await blackListModel.findOne({token: token}); 

    if(isBlackListed){
        return res.status(200).json({message: "Unauthorized"}); 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

exports.authCaptain = async  (req, res, next) => {

    const authHeader = req.headers.authorization;

    const token = req.cookies.token || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await blackListModel.findOne({token: token}); 

    if(isBlackListed){
        return res.status(200).json({message: "Unauthorized"}); 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.captain = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

