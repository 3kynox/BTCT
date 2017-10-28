const request = require('request-promise');


/* eslint-disable no-unused-vars */
module.exports = function Resolvers() {
  const app = this;

  const Users = app.service('users');
  const Indicators = app.service('indicators');

  const localRequest = request.defaults({
    baseUrl: `http://${app.get('host')}:${app.get('port')}`,
    json: true
  });

  return {
    AuthPayload: {
      data(auth, args, context) {
        return auth.data;
      }
    },

    RootQuery: {
      users(root, args, context) {
        return Users
          .find(context)
          .then(results => results.data);
      },

      user(root, { id }, context) {
        return Users.get(id, context);
      },

      indicators(root, args, context) {
        return Indicators
          .find(context)
          .then(results => results.data);
      },

      indicator(root, { id }, context) {
          return Indicators.get(id, context);
      },
    },

    RootMutation: {
      logIn(root, {strategy, username, password}, context) {
        return localRequest({
          uri: '/authentication',
          method: 'POST',
          body: {strategy: strategy, username: username, password: password}
        });
      }
    }
  };
};
