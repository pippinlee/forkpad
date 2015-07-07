var express = require('express'),
    app = express(),
    path = require('path'),
    request = require('request'),
    hostname = process.env.HOSTNAME || 'localhost',
    // port = process.env.PORT || 4567,
    publicDir = process.argv[2] || __dirname + '/public',
    fs = require('fs'),
    mongoose = require('mongoose'),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    ObjectId = require('mongodb').ObjectID,
    config = require('./config'),
    collection = db.collection("stories");




var createServer = function(port) {


    var db = new Db('forkpad', new Server('localhost', 27017));

    // checks if config.json file exists and has been decrypted
    // run `make decrypt_conf` if no config.json exists
    if (!fs.existsSync("config.json")) {
        console.error("Config file [conf/settings.json] missing!");
        console.error("Did you forget to run `make decrypt_conf`?");
        process.exit(1);
    }

    function getWattpad(id, cb) {
        var options = {
            method: 'GET',
            url: 'https://www.wattpad.com:443/v4/parts/' + id + '/text',
            headers: {
                'authorization': config.wattpad.authorization,
                'api-key': config.wattpad["api-key"]
            }
        };

        request(options, function(error, response, body) {
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
            if (error) {
                res.send('error');
                return;
            }
            res.send(data);
        });
    });

    app.get('/api/insert/:text', function(req, res) {
        var text = req.params.text;
        // Fetch a collection to insert document into
        db.open(function(err, db) {
            // Insert a single document
            // console.log(text.toString());
            collection.insert({
                text: text.toString()
            }, function(err, docsInserted) {
                // get last id
                res.send(docsInserted.ops[0]._id);
            });

        });
    });


    app.get('/api/retrieve/:id', function(req, res) {
        var id = req.params.id;
            // Insert a single document
        db.open(function(err, db) {
            // console.log(text.toString());
            collection.findOne({
                "_id": new ObjectId(id)
            }, function(err, doc) {
                if (err) {
                    throw err;
                }
                res.send(doc.text);
            });
        });



    });


    app.get('/', function(req, res) {
        fs.readFile("public/index.html", function(err, data) {
            if (err) {
                throw err;
            }
            res.set('Content-Type', 'text/html');
            res.send(data);
        });
    })

    app.get('/:id', function(req, res) {

        //res.redirect("/public/editor.html");
        fs.readFile("public/editor.html", function(err, data) {
            if (err) {
                throw err;
            }
            res.set('Content-Type', 'text/html');
            res.send(data);
        });

    });

    app.get('/share/:id', function(req, res) {

        //res.redirect("/public/editor.html");
        fs.readFile("public/editor.html", function(err, data) {
            if (err) {
                throw err;
            }
            res.set('Content-Type', 'text/html');
            res.send(data);
        });

    });

    app.use('/static/', express.static(path.join(__dirname, 'public')));

    var server = app.listen(port, function() {

        var host = server.address().address;
        var port = server.address().port;

        console.log('forkpad listening at http://%s:%s', host, port);

    });
};
module.exports = createServer;
