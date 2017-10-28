// Initializes the `indicators` service on path `/indicators`
const createService = require('feathers-knex');
const createModel = require('../../models/indicators.model');
const hooks = require('./indicators.hooks');
const filters = require('./indicators.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'table_store',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/indicators', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('indicators');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
