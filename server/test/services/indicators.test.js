const assert = require('assert');
const app = require('../../src/app');

describe('\'indicators\' service', () => {
  it('registered the service', () => {
    const service = app.service('indicators');

    assert.ok(service, 'Registered the service');
  });
});
