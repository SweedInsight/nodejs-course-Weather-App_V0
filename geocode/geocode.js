const request = require('request');

var geocodeAddress = (address, callback) => {
    //Encode URI
    var encodedURI = encodeURIComponent(address); // replace space with %20 etc.

    //Decode URI --> decodeURIComponent() //not needed here

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
        json: true  
    }, (error, response, body) => {
        //console.log(error); //always null
        //console.log(`https://map11s.googleapis.com/maps/api/geocode/json?address=${encodedURI}`);

        if (error) {
            callback("Unable to connect to Google servers.");
        } else if (body.status ==='OVER_QUERY_LIMIT') {
            callback("Cannot fetch any more free data.");
        } else if (body.status ==='ZERO_RESULTS') {
            callback("No results for the given Address.")

        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            //console.log(JSON.stringify(body, undefined, 2)); //Stringify object 2-Levels depth 
            //console.log(`Address: ${body.results[0].formatted_address}`+
            //`\nLocation: LAT / LNG ${}`);    
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;