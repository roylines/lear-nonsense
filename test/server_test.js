var assert = require('assert'),
      sinon = require('sinon'),
      server = require('../lib/server.js'),
      lear = require('../lib/lear.js');

describe('server', function() {
  describe('with no mocks', function() {
    it('should bind app',  function() {
      assert.notEqual(server.app, null);
      assert.notEqual(server.app, undefined);
    });
    describe('port', function() {
      describe('with PORT set', function() {
        var oldPort = process.env.PORT;
        before(function() {
          process.env.PORT = 42;
        })
        after(function() {
          process.env.PORT = oldPort;
        })
        it('should use PORT', function() {
          assert.equal(server.port(), 42);
        })
      });
      // describe('without PORT set', function() {
      //   var oldPort = process.env.PORT;
      //   before(function() {
      //     process.env.PORT = null;
      //   })
      //   after(function() {
      //     process.env.PORT = oldPort;
      //   })
      //   it('should use PORT', function() {
      //     assert.equal(server.port(), 5000);
      //   })
      // });
    });
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