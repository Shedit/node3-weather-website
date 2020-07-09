const request = require('postman-request');
const { MAPBOX_API_KEY } = require('../config');

const geocode = (address, callback) => { 
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_API_KEY}&limit=1`;
    request({ url, json: true}, (error, { body } = {}) => {
        if (error){
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined); 
        } else {
            const { place_name: location , center } = body.features[0]; 

            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            })
        }

    });
}

module.exports = geocode; 