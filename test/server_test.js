var assert = require('assert'),
      sinon = require('sinon'),
      server = require('../lib/server.js'),
      lear = require('../lib/lear.js');

describe('server', function() {
  it('should bind app',  function() {
    assert.notEqual(server.app, null);
    assert.notEqual(server.app, undefined);
  });
  describe('with app mock', function() {
    var oldApp = server.app;
    beforeEach(function() {
      server.app = sinon.stub();
    });
    afterEach(function() {
      server.app = oldApp;
    });
    describe('listen', function() {
      it('should...', function() {
        assert(true);
      });
    });
  });
});