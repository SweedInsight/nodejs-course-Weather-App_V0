
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const forecast = require('./forecast/forecast.js');

const api_key_forecast = '77375879405855e29fcbb0e812baacba';

const argv = yargs
    .options({
    address: {
        demand: true,
        alias: 'a',
        describe: 'Address to fetch weather for',
        string: true //else empty arg --> false flag
    }
    })
    .help() //help 
    .alias('help', 'h')
    .argv;

    geocode.geocodeAddress(argv.address, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        }else{
            console.log(JSON.stringify(results, undefined, 2));
         {
            }
            forecast.getWeather(api_key_forecast, results,(errorMessage, weatherResults) => {
                if (errorMessage) {
                    console.log(errorMessage);
                }else {
                    console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
                }
            });
        }
    });






    