const request = require('request');

var getWeather = (secretKey, geocodeAddress, callback) => {
  
    request({
        //Inject the arguments
        url: `https://api.darksky.net/forecast/${secretKey}/${geocodeAddress.latitude}, ${geocodeAddress.longitude}`,
        json: true  
    }, (error, response, body) => {

        if (error) {
            console.log(error)
            callback("Unable to connect to Forecast.io server.");
        } else if (response.statusCode === 400) {
            callback("Unable to fetch weather data.")
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });

        }
    });
};

module.exports.getWeather = getWeather;