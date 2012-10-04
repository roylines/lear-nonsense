/*jshint es5:true*/
var express = require('express'),
      handler = require('./handler.js'),
      littleprinter = require('littleprinter');

var server = { };

server.port = process.env.PORT || 5000;

server.app = express();

server.listen = function() {
  server.app.set('view engine', 'ejs');

  var root = __dirname + '/../';
  server.app.set('views', root + 'views');
  server.app.use(express.static(root + 'nonsense'));

  littleprinter.setup(server.app, handler);

  server.app.listen(server.port);
  console.log('Server started on: http://localhost:' + server.port);
};

module.exports = server;