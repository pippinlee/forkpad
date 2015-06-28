var express = require('express'),
  app = express(),
  path = require('path'),
  request = require('request'),
  hostname = process.env.HOSTNAME || 'localhost',
  port = parseInt(process.env.PORT, 10) || 4567,
  publicDir = process.argv[2] || __dirname + '/public',
  fs = require('fs');

function getWattpad(id, cb) {
  var options = {
    method: 'GET',
    url: 'https://www.wattpad.com:443/v4/parts/'+id+'/text',
    headers: {
      'authorization': 'REDACTED',
      'api-key': 'REDACTED'
  }};

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(null, JSON.parse(response.body).text);
      return;
    }
    cb(error);
  });
}

app.get('/api/pad/:id', function(req, res) {
  var id = req.params.id;

  getWattpad(id, function(error, data) {
    res.set('Content-Type', 'text/plain');
    if(error) {
      res.send('error');
      return;
    }
    res.send(data);
  });
});

app.get('/', function(req, res) {
    fs.readFile("public/index.html", function (err, data){
    if (err) {
      throw err;
    }
    res.set('Content-Type', 'text/html');
    res.send(data);
  });
})

app.get('/:id', function(req, res){

  //res.redirect("/public/editor.html");
  fs.readFile("public/editor.html", function (err, data){
    if (err) {
      throw err;
    }
    res.set('Content-Type', 'text/html');
    res.send(data);
  });

});

app.use('/static/', express.static(path.join(__dirname, 'public')));


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('forkPad listening at http://%s:%s', host, port);

});

