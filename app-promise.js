const yargs = require('yargs');
const axios = require('axios');
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
const encodedAddress = encodeURI(address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=> {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('unable to find that address');
  }
  console.log(response.data.results[0].formatted_address);
  const latitude = response.data.results[0].geometry.location.lat;
  const longitude = response.data.results[0].geometry.location.lng;
  const forecastUrl = `https://api.darksky.net/forecast/36df2fe59fd23e5e838db0741817765c/${latitude},${longitude}`
  return axios.get(forecastUrl);
}).then((response) => {
  if (response.data.code === 400) {
    throw new Error('something went wrong');
  }
  console.log(`The temperature is ${response.data.currently.temperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to api servers');
  } else {
    console.log(e.message);
  }
});
