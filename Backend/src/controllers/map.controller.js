const mapService = require("../services/map.service"); 


exports.getCoordinates = async (req, res) => {
    try {
        const {address} = req.query;
        const coordinates = await mapService.getAddressCoordinate(address); 
        res.status(200).json(coordinates); 
    } catch (error) {
        console.error(error); 
        res.status(404).json({message: 'Coordinates not found'}); 
    }
}


exports.getDistanceTime = async (req, res) => {

    try {
        const { origin, destination } = req.query;

        const distanceTime = await mapService.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAutoCompleteSuggestions = async (req, res) => {
    try {
        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        console.log(suggestions); 
        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}