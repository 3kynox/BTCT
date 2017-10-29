const knex = require('knex');

module.exports = function () {
  const app = this;
  const { client, connection } = app.get('sqlite');
  const db = knex({ client, connection, useNullAsDefault: true });

  app.set('db', db);
};
