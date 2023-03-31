import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri:
    typeof process.env.REACT_APP_GRAPHQL_API_URL === "undefined"
      ? "http://localhost:4000"
      : process.env.REACT_APP_GRAPHQL_API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});
