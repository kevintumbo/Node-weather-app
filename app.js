const yargs = require('yargs');

const geocode = require('./geocode/geocode')

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
    console.log(JSON.stringify(results, undefined, 2));
  }
});

// 36df2fe59fd23e5e838db0741817765c

const request = require('request');

request({
  url: `https://api.darksky.net/forecast/36df2fe59fd23e5e838db0741817765c/-1.2647105,36.7961167`,
  json: true
}, (error, response, body ) => {
  if (error) {
    console.log(error)
  }else if (body.code === 400) {
    console.log(`error: ${body.error}`);
  }else {
    console.log(`Tempreture: ${body.currently.temperature}`)
  }

});
