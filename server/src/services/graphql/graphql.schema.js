const typeDefinitions = `

type User {
  id: String! # the ! means that every User object _must_ have an id
  username: String!
  permissions: String
}

type AuthPayload {
  token: String # JSON Web Token
  data: User
}

# the schema allows the following queries:
type RootQuery {
  user(id: String!): User
  users: [User]
}

# this schema allows the following mutations:
type RootMutation {
  logIn (
    username: String!
    password: String!
  ): AuthPayload
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

module.exports = [typeDefinitions];
