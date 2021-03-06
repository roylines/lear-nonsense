var lear  = require('./lear.js');

var handler = { };

// change this meta for your publication
handler.meta = {
  "owner_email":"roy@roylines.co.uk",
  "publication_api_version":"1.0",
  "name": "Lear Nonsense",
  "description": "The Glorious Nonsense of Edward Lear",
  "delivered_on":"every week",
  "external_configuration": false,
  "send_timezone_info": false,
  "send_delivery_count": true
};

handler.getIndex = function(deliveryCount) {
  if(!deliveryCount) {
    return 0;
  }

  return deliveryCount;
};

handler.edition =  function(localDeliveryTime, deliveryCount, other, done) {
  var index = handler.getIndex(deliveryCount);
  lear.getNonsense(index, function(e, nonsense) {
    var data = {
      view: 'nonsense',
      meta: {
        index: index,
        nonsense : nonsense
      }
    };
    done(e, data);
  });
};

handler.sample = function(done) {
  handler.edition(null, null, null, done);
};

module.exports = handler;