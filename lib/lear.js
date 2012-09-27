var lear = { };

lear.getNonsense = function(deliveryCount, done) {
  if(!deliveryCount) {
    deliveryCount = 0;
  }

  var nonsense = [{
    prose: "The Absolutely Abstemious Ass, who resided in a Barrell, and only lived on Soda Water and Pickled Cucumbers."
  },{
    prose: "The Bountiful Beetle, who always carried a Green Umbrella when it didn't rain, and left it at home when it did."
  },{
    prose: "The Comfortable Confidential Cow, who sate in her Red Morocco Arm Chair and toasted her own Bread at the parlour Fire."
  }];

  done(null, nonsense[deliveryCount]);
};

module.exports = lear;