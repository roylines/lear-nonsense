var assert = require('assert'),
      fs = require('fs'),
      sinon = require('sinon'),
      lear = require('../lib/lear.js');

describe('when using lear', function() {
  describe('calling getNonsense for index 0', function() {
    it('should not error', function(done) {
      lear.getNonsense(0, done);
    });
    it('should return prose for index 0', function(done) {
      lear.getNonsense(0, function(e, prose) {
        var expected = {
          letter: 'a',
          prose: ["The Absolutely Abstemious Ass,","who resided in a Barrel,","and only lived on","Soda Water and Pickled Cucumbers."]
        };
        assert.deepEqual(prose, expected);
        done();
      });
    });
  });
});
