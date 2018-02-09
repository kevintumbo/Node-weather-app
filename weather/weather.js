const request = require('request');

/**
 * [getWeather description]
 * @param  {[number]}   latitude  [Latitude of address]
 * @param  {[number]}   longitute [longitude of address]
 * @param  {Function} callback  [callback]
 * @return {Fuction}             [callback that returns the response]
 */
const getWeather = (latitude, longitute, callback) => {
  request({
    url: `https://api.darksky.net/forecast/36df2fe59fd23e5e838db0741817765c/${latitude},${longitute}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Sorry.Server not found');
    } else if (body.code === 400) {
      callback(body.error);
    } else {
      callback( undefined,
        {
          temperature : body.currently.temperature
        });
    }
  });
}

module.exports = {
  getWeather
};
