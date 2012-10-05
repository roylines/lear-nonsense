var fs = require('fs'),
      util = require('util');

var lear = { };

lear.proseCount = 1;

lear.getNonsense = function(deliveryCount, done) {
    if(!deliveryCount) {
      deliveryCount = 0;
    }

    var file = util.format('nonsense/%s.txt', deliveryCount);
    fs.readFile(file, function(e, data) {
      if(e) {
        return done(e);
      }

      var prose = data.toString().split('\n');
      return done(null, { prose:  prose});
    });
};

module.exports = lear;