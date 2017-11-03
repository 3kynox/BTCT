import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://noxen.net:3030/graphql'
})

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null
    }
  })
  return forward(operation)
})

// use with apollo-client
const link = middlewareLink.concat(httpLink)

// Create the apollo client
const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Install the vue plugin like before
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  // Multiple clients support
  // Use the 'client' option inside queries
  // or '$client' on the apollo definition
  clients: { apolloClient },
  // Default client
  defaultClient: apolloClient,
  // Default 'apollo' definition
  defaultOptions: {
    // See 'apollo' definition
    // For example: default loading key
    $loadingKey: 'loading'
  },
  // Watch loading state for all queries
  // See the 'watchLoading' advanced option
  // watchLoading (state, mod) {
  //   loading += mod
  //   console.log('Global loading', loading, mod)
  // },
  // Global error handler for all smart queries and subscriptions
  errorHandler (error) {
    console.log('Global error handler')
    console.error(error)
  }
})

export default apolloProvider
