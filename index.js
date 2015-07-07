var server = require('./server.js');
port = process.argv[3] || 80,
server(port);
