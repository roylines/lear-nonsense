var assert = require('assert'),
      littleprinter = require('littleprinter'),
      sinon = require('sinon'),
      server = require('../lib/server.js'),
      lear = require('../lib/lear.js');

describe('when using server', function() {
  describe('with no mocks', function() {
    it('should bind app',  function() {
      assert.notEqual(server.app, null);
      assert.notEqual(server.app, undefined);
    });
    describe('when calling port', function() {
      describe('with PORT set to 42', function() {
        var oldPort = process.env.PORT;
        before(function() {
          process.env.PORT = 42;
        });
        after(function() {
          process.env.PORT = oldPort;
        });
        it('should return 42', function() {
          assert.equal(server.port(), 42);
        });
      });
    });
  });
  describe('with app mock', function() {
    var oldApp = server.app;
    beforeEach(function() {
      sinon.stub(console, 'log');
      sinon.stub(littleprinter, 'setup');
      sinon.stub(server, 'port').returns(42);
      server.app = sinon.stub();
      server.app.set = sinon.stub();
      server.app.use = sinon.stub();
      server.app.listen = sinon.stub();
    });
    afterEach(function() {
      console.log.restore();
      server.port.restore();
      server.app = oldApp;
      littleprinter.setup.restore();
    });
    describe('when calling listen', function() {
      it('should set ejs as view template', function() {
        server.listen();
        assert(server.app.set.withArgs('view engine').calledOnce);
        assert(server.app.set.withArgs('view engine', 'ejs').calledOnce);
      });
      it('should set views path', function() {
        server.listen();
        assert(server.app.set.withArgs('views').calledOnce);
      });
      it('should call setup on little printer', function() {
        server.listen();
        assert(littleprinter.setup.calledOnce);
        assert(littleprinter.setup.withArgs(server.app).calledOnce);
      });
      it('should call listen', function() {
        server.listen();
        assert(server.app.listen.calledOnce);
        assert(server.app.listen.withArgs(42).calledOnce);
      });
    });
  });
});