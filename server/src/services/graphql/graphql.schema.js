const typeDefinitions = `
# the schema allows the following queries:
type RootQuery {}

# this schema allows the following mutations:
type RootMutation {}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

module.exports = [typeDefinitions];
