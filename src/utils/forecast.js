const request = require('request');

const forecast = (latitude, longitude, callBack) => {

    const url = 'https://api.darksky.net/forecast/9315651447c36173795ed7246b2a7db7/'+latitude+','+longitude+'?units=si';
    request({ url, json: true}, (error, response, body) => {
        const {body: responseBody} = response;
        if(error){
            callBack('Unable to connect to api', undefined);
        }else if(responseBody.error){
            callBack('unable to find location', undefined);
        }else{
            let temperature  = responseBody.currently.temperature;
            let precipProbability = responseBody.currently.precipProbability;
            let data = `It is currently ${temperature} degrees out. There is ${precipProbability}% chance of rain`;
            callBack(undefined, data);
        }
            
    });
}

module.exports = forecast;