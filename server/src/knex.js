const knex = require('knex');

module.exports = function () {
  const app = this;
  const { client, connection } = app.get('sqlite');
  console.log(connection);
  const db = knex({ client, connection });

  app.set('db', db);
};
