const request = require('request');

const geocodeAddress = (address, callback) => {
  encodedAddress = encodeURI(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to google servers');
    }else if (body.status === 'INVALID_REQUEST') {
      callback('That address does not exist');
    }else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        Latitude: body.results[0].geometry.location.lat,
        Longitude: body.results[0].geometry.location.lng
      });
    }
  });
}

module.exports = {
  geocodeAddress
};
