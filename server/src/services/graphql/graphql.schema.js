const typeDefinitions = `

type User {
  id: String! # the ! means that every User object _must_ have an id
  username: String!
  permissions: String
  createdAt: String
  updatedAt: String
}

type Indicator {
  id: String!
  Exchange: String!
  Pair: String!
  Base_balance: String
  Quote_balance: String
  On_Orders: String
  Bid: String
  Ask: String
  Buy: String
  Sell: String
  Break_point: String
  Bought_avg: String
  Status_message: String
  Bought_volume: String
  Price: String
  Sold_volume: String
  Averaged_down_volume: String
  Open_order: String
  Last_order: String
  EMA1: String
  EMA2: String
  LowBB: String
  HighBB: String
  SMA: String
  Status_message1: String
  Status_message2: String
  GB_status: String
}

type AuthPayload {
  accessToken: String # JSON Web Token
  data: User
}

# the schema allows the following queries:
type RootQuery {
  user(id: String!): User
  users: [User]
  indicator(id: String!): Indicator
  indicators: [Indicator]
}

# this schema allows the following mutations:
type RootMutation {
  logIn (
    strategy: String!
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
