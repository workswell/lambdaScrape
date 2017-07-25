const axios = require('axios')
const jquery = require('jquery')
const jsdom = require('jsdom')
const url = require('url')

const {
  JSDOM
} = jsdom

const parserMap = new Map()

parserMap.set('www.chemistwarehouse.com.au', chemistwarehouseParser)
parserMap.set('www.priceline.com.au', pricelineParser)
parserMap.set('www.amcal.com.au', amcalParser)

exports.handler = function(event, context, callback) {
  if (event.url) {
    const itemUrl = url.parse(event.url);
    axios.get(event.url)
    .then((resp) => {
      // console.log('resped');
      const dom = new JSDOM(resp.data)
      const $ = jquery(dom.window)
      const parser = parserMap.get(itemUrl.host)
      const price = parser($)
      callback(null, {result: price});
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

function chemistwarehouseParser($) {
  return $('.Price[itemprop=price]').text()
}


function pricelineParser($) {
  return $('meta[property="product:price:amount"]')[0].content
}

function amcalParser($) {
  return $('meta[itemprop="price"]')[0].content
}
