import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import apolloLocalStateSetup from './apollo-client-local-state-setup'

const cache = new InMemoryCache()

export default new ApolloClient({
  link: ApolloLink.from([
    apolloLocalStateSetup,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: 'http://localhost:4000',
      credentials: 'same-origin',
    }),
  ]),
  cache,
})
