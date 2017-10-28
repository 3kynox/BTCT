const users = require('./users/users.service.js');
const graphql = require('./graphql/graphql.service.js');


module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  // has to be last
  app.configure(graphql);
};
