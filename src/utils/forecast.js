const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/f6b8833c7ef8012cc3f37112a8dbcccf/' + lat + ',' + long + '?lang=de&units=si';

    request({ url, json: true }, (error, { body }) => {
        if(error){ // network connection error
            callback('Unable to connect to weather service!', undefined);
        }else if (body.error) { // invalid user's input
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, body.currently);
        }
    });
}

module.exports = forecast;
