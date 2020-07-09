const request = require('postman-request');
const { WEATHER_API_KEY } = require('../config');

const forecast = (latitude, longitude, callback) => { 
    const url = `http://api.weatherstack.com/current?access_key=8c3de2e808cad6facfc4313f92d2c68e&query=${latitude},${longitude}`; 
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to api!', undefined); 
        } else if (body.error){
            callback(`Unable to find location!`, undefined); 
        } else {
            const data = body.current;
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`);
        }
    });
}

module.exports = forecast;