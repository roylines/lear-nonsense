var assert = require('assert'),
      sinon = require('sinon'),
      handler = require('../lib/handler.js');

// {
//   "owner_email":"roy@roylines.co.uk",
//   "publication_api_version":"1.0",
//   "name": "Lear Nonsense",
//   "description": "The Glorious Nonsense of Edward Lear",
//   "delivered_on":"every week",
//   "external_configuration": false,
//   "send_timezone_info": false,
//   "send_delivery_count": true
// };

describe('handler', function() {
  describe('meta', function() {
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
});