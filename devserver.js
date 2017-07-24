var express = require('express');
var bodyParser = require('body-parser');
var lambda = require('./lambda');
var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  const url = req.query.url
  lambda.handler({url}, {}, function(err, result) {
    if (err) {
      return res.send(err);
    }
    res.send(result);
  });
});

app.listen(3000);
