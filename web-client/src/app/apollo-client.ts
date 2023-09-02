import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  //@ts-ignore
  uri: import.meta.env.VITE_GRAPHQL_SERVER,
  cache: new InMemoryCache(),
});