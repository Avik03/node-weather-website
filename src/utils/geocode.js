const request = require('request');

const geocode = (address, callBack) => {

    const geocodingUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYXZpazAzIiwiYSI6ImNqemJwZmp4NTAzOG0zZG14bXN1ODlpbHcifQ.pbRBSthdlw42y93_VLiUqw";
    
    request({url: geocodingUrl, json: true}, (error, response,body) => {
        const {body: responseBody} = response;
        if(error){
           // throw new Error("Unable to connect to API");
            callBack('Unable to connect to API',undefined);
        }else if(responseBody.features.length === 0){
            callBack('No Matching results found.Try another search', undefined);
        }else{
            let features = responseBody.features;
            let latlong = features[0].center;
            let latitude = latlong[1];
            let longitude = latlong[0];
            let location = features[0].place_name;
            callBack(undefined,{
                latitude: latlong[1],
                longitude: latlong[0],
                location: location
            })
        }   
    });
        
}

module.exports = geocode;