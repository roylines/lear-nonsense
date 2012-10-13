var assert = require('assert'),
      fs = require('fs'),
      sinon = require('sinon'),
      lear = require('../lib/lear.js');

describe('when using lear', function() {
  describe('calling getNonsense for index 0', function() {
    it('should not error', function(done) {
      lear.getNonsense(0, done);
    });
    it('should return expected prose', function(done) {
      lear.getNonsense(0, function(e, nonsense) {
        var expected = {
          letter: 'a',
          prose: ["The Absolutely Abstemious Ass,","who resided in a Barrel,","and only lived on","Soda Water and Pickled Cucumbers."]
        };
        assert.deepEqual(nonsense, expected);
        done();
      });
    });
  });
  describe('calling getNonsense for index 60', function() {
    // it('should not error', function(done) {
    //   lear.getNonsense(60, done);
    // });
    // it('should return prose', function(done) {
    //   lear.getNonsense(60, function(e, nonsense) {
    //     assert(nonsense);
    //   });
    // });
  });
});
