var fs = require('fs'),
      util = require('util');

var lear = { };

lear.proseCount = 10;

lear.getNonsense = function(index, done) {
    var file = util.format('nonsense/%s.txt', index);
    fs.readFile(file, function(e, data) {
      if(e) {
        return done(e);
      }

      var prose = data.toString().split('\n');
      return done(null, { prose:  prose});
    });
};

module.exports = lear;