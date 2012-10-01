var fs = require('fs');

var lear = { };

lear.getNonsense = function(deliveryCount, done) {
    if(!deliveryCount) {
      deliveryCount = 0;
    }

    fs.readFile('nonsense/1.txt', function(e, data) {
      if(e) {
        return done(e);
      }

      var prose = data.toString().split('\n');
      return done(null, { prose:  prose});
    });
};

module.exports = lear;