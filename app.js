const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
  address: {
    demand: true,
    alias: 'a',
    describe: 'address to fetch the weather',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;

const address = argv.address;

geocode.geocodeAddress(address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(results.address);
    weather.getWeather(results.Latitude, results.Longitude, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(JSON.stringify(results, undefined, 2));
      }
    });
  }
});

// 36df2fe59fd23e5e838db0741817765c
