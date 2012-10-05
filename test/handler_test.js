var assert = require('assert'),
      sinon = require('sinon'),
      handler = require('../lib/handler.js'),
      lear = require('../lib/lear.js');

describe('when using handler', function() {
  describe('and calling meta', function() {
    it('should set owner_email', function() {
      assert.equal(handler.meta.owner_email, 'roy@roylines.co.uk');
    });
    it('should set publication_api_version', function() {
      assert.equal(handler.meta.publication_api_version, '1.0');
    });
    it('should set publication_api_version', function() {
      assert.equal(handler.meta.publication_api_version, '1.0');
    });
    it('should set name', function() {
      assert.equal(handler.meta.name, 'Lear Nonsense');
    });
    it('should set description', function() {
      assert.equal(handler.meta.description, 'The Glorious Nonsense of Edward Lear');
    });
    it('should set delivered_on', function() {
      assert.equal(handler.meta.delivered_on, 'every week');
    });
    it('should set external_configuration', function() {
      assert.equal(handler.meta.external_configuration, false);
    });
    it('should set send_timezone_info', function() {
      assert.equal(handler.meta.send_timezone_info, false);
    });
    it('should set send_delivery_count', function() {
      assert.equal(handler.meta.send_delivery_count, true);
    });
  });
  describe('and calling getIndex', function() {
    it('with null delivery count should return 0', function() {
      assert.equal(handler.getIndex(null), 0);
    });
    it('with delivery count 1 should return 0', function() {
      assert.equal(handler.getIndex(1), 0);
    });
    it('with delivery count 50 should return 49', function() {
      assert.equal(handler.getIndex(50), 49);
    });
  });
  describe('and calling edition',  function() {
    beforeEach( function() {
      sinon.stub(handler, 'getIndex').returns(42);
      sinon.stub(lear, 'getNonsense');
    });
    afterEach(function() {
      handler.getIndex.restore();
      lear.getNonsense.restore();
    });
    it('should return correct data if getNonsense yields', function(done) {
      lear.getNonsense.yields(null, { prose:  'PROSE'});
      handler.edition(null, 1, null, function(e, data) {
        var expectedData = {
          view: 'nonsense',
          meta: {
            index: 42,
            nonsense : {
              prose: 'PROSE'
            }
          }
        };
        assert.deepEqual(data, expectedData);
        done(e, data);
      });
    });
    it('should call getIndex with deliveryCount', function(done) {
      lear.getNonsense.yields();
      handler.edition(null, 88, null, function(e, data) {
        assert(handler.getIndex.calledOnce);
        assert(handler.getIndex.withArgs(88).calledOnce);
        done();
      });
    });
    it('should call getNonsense once', function(done) {
      lear.getNonsense.yields();
      handler.edition(null, 1, null, function(e, data) {
        assert(lear.getNonsense.calledOnce);
        done();
      });
    });
     it('should call getNonsense passing index', function(done) {
      lear.getNonsense.yields();
      handler.edition(null, 1, null, function(e, data) {
        assert(lear.getNonsense.withArgs(42).calledOnce);
        done();
      });
    });
    it('should error if getNonsense errors', function(done) {
      lear.getNonsense.yields('ERROR');
      handler.edition(null, 1, null, function(e) {
        assert.equal(e, 'ERROR');
        done();
      });
    });
  });
  describe('and calling sample', function(){
     beforeEach( function() {
      sinon.stub(handler, 'edition');
    });
    afterEach(function() {
      handler.edition.restore();
    });
    it('should call edition once', function(done) {
      handler.edition.yields();
      handler.sample(function() {
        assert(handler.edition.calledOnce);
        done();
      });
    });
    it('should call edition with correct arguments', function(done) {
      handler.edition.yields();
      handler.sample(function() {
        assert(handler.edition.withArgs(null, null, null).calledOnce);
        done();
      });
    });
    it('should return whatever edition returns', function(done) {
      handler.edition.yields('ERROR', 'DATA');
      handler.sample(function(e, d) {
        assert.equal(e, 'ERROR');
        assert.equal(d, 'DATA');
        done();
      });
    });
  });
});