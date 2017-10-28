// Initializes the `graphql` service on path `/graphql`

const graphql = require('graphql-server-express').graphqlExpress;
const graphiql = require('graphql-server-express').graphiqlExpress;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const Resolvers = require('./graphql.resolvers');
const Schema = require('./graphql.schema');


module.exports = function () {
  const app = this;

  const executableSchema = makeExecutableSchema({
      typeDefs: Schema,
      resolvers: Resolvers.call(app)
  });

  // Initialize our service with any options it requires
  app.use('/graphql', graphql((req) => {
      return {
          schema: executableSchema,
          context: req.feathers
      };
  }));

  app.use('/graphiql', graphiql({
      endpointURL: '/graphql',
  }));
};
