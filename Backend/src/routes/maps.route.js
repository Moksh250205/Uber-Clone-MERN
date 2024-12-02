const express = require("express"); 
const router = express.Router(); 
const authMiddleware = require("../middleware/auth.middleware")
const mapController = require("../controllers/map.controller"); 

router.get("/get-coordinates", authMiddleware.authUser, mapController.getCoordinates); 
router.get("/get-distanceTime", authMiddleware.authUser, mapController.getDistanceTime); 
router.get('/get-suggestions', authMiddleware.authUser, mapController.getAutoCompleteSuggestions); 


module.exports = router; 