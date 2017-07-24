const axios = require('axios')
const jquery = require('jquery')
const jsdom = require('jsdom')

const {
  JSDOM
} = jsdom

exports.handler = function(event, context, callback) {
  if (event.url) {
    axios.get(event.url)
    .then((resp) => {
      // console.log('resped');
      const dom = new JSDOM(resp.data)
      const $ = jquery(dom.window)
      const price = $('.Price[itemprop=price]')
      callback(null, {result: price.text()});
      //callback(null, {result: 'good query'})
    })
    .catch((err) => {
      callback(null, {error: 'bad query'});
    })
    // console.log(event.url);
    // callback(null, {result: 'good query'})
  }
  else {
    callback(null, {error: 'bad query'});
  }
};
