const axios = require('axios');

exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_GEOCODING_API_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url); 
        if(response.data.status === 'OK'){
            const location = response.data.results[0].geometry.location; 
            return{
                ltd: location.lat, 
                lng: location.lng
            }
        }
        else{
            throw new Error('Unable to fetch co-ordinates'); 
        }
    } catch (error) {
        console.error(error); 
        throw error; 
    }
}

exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error("Origin and destination are required"); 
    }

    const apiKey = process.env.GOOGLE_GEOCODING_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {

        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_GEOCODING_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}