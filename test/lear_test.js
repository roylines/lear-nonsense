var assert = require('assert'),
      fs = require('fs'),
      sinon = require('sinon'),
      lear = require('../lib/lear.js');

describe('when using lear', function() {
  describe('for real', function() {
    describe('calling getNonsense', function() {
      it('should not error', function(done) {
        lear.getNonsense(1, done);
      });
      it('should return prose', function(done) {
        lear.getNonsense(1, function(e, prose) {
          assert.deepEqual(prose, {"prose":["The Absolutely Abstemious Ass,","who resided in a Barrel,","and only lived on","Soda Water and Pickled Cucumbers."]});
          done();
        });
      });
    });
  });
  describe('with stubbed files', function() {
    beforeEach(function() {
      sinon.stub(fs, 'readFile').yields(null, 'Nonsense\nand more');
    });
    afterEach(function() {
      fs.readFile.restore();
    });
    describe('calling getNonsense', function() {
      describe('and readFile yields error', function() {
        beforeEach(function() {
          fs.readFile.yields('ERROR');
        });
        it('should error', function(done) {
          lear.getNonsense(1, function(e) {
            assert.equal(e, 'ERROR');
            done();
          });
        });
      });
      describe('and readFile yields data', function() {
        it('should not error', function(done) {
          lear.getNonsense(1, done);
        });
        it('should return prose', function(done) {
          lear.getNonsense(1, function(e, prose) {
            assert.deepEqual(prose, {"prose":["Nonsense","and more"]});
            done();
          });
        });
        it('and deliveryCount is null should look for 0.txt', function(done) {
          lear.getNonsense(null, function(e, prose) {
            assert(fs.readFile.calledOnce);
            assert.equal(fs.readFile.args[0][0], 'nonsense/0.txt');
            done();
          });
        });
        it('and deliveryCount is 1 should look for 1.txt', function(done) {
          lear.getNonsense(1, function(e, prose) {
            assert(fs.readFile.calledOnce);
            assert.equal(fs.readFile.args[0][0], 'nonsense/1.txt');
            done();
          });
        });
        // it('and deliveryCount is 2 should look for 1.txt', function(done) {
        //   lear.getNonsense(2, function(e, prose) {
        //     assert(fs.readFile.calledOnce);
        //     assert.equal(fs.readFile.args[0][0], 'nonsense/1.txt');
        //     done();
        //   });
        // });
      });
    });
  });
});
