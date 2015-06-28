var express = require('express');
var request = require('request');

var app = express();

app.get('/*', function(req, res){
var params = req.url.substring(1);
var options = { method: 'GET',
  url: 'https://www.wattpad.com:443/v4/parts/'+params+'/text',
  headers: 
   { authorization: 'REDACTED',
     'api-key': 'REDACTED' } };

request(options, function (error, response, body) {

  if (!error && response.statusCode == 200) {
	res.send(response.body);

  }
  else res.send('error');
});

});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('forkPad listening at http://%s:%s', host, port);

});

