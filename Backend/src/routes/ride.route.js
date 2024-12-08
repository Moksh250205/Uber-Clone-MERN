const express = require("express"); 
const router = express.Router(); 
const rideController = require("../controllers/ride.controller")
const authMiddleware = require("../middleware/auth.middleware"); 

router.post("/create-ride", authMiddleware.authUser, rideController.createRideController); 
router.get("/get-fare", authMiddleware.authUser, rideController.getFareController); 
router.post("/confirm-ride", authMiddleware.authCaptain, rideController.confirmRideController); 
router.get("/start-ride", authMiddleware.authCaptain, rideController.startRideController); 
router.get("/end-ride", authMiddleware.authCaptain, rideController.endRideController);

module.exports = router; 