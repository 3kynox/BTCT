import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3030/graphql',
    transportBatching: true
  }),
  connectToDevTools: true
})

// Create the apolloProvider Plug-in
const api = new VueApollo({
  defaultClient: apolloClient
})

export default api
