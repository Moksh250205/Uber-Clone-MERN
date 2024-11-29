const express = require('express'); 
const router = express.Router(); 
const captainController = require('../controllers/captain.controller'); 
const authMiddleware = require('../middleware/auth.middleware'); 

router.post('/register', captainController.registerCaptain); 
router.post('/login', captainController.loginCaptain); 
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router; 