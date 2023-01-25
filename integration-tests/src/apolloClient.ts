import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "cross-fetch";
import "dotenv/config";

export default new ApolloClient({
  link: new HttpLink({
    uri: process.env.API_URL || "http://localhost:4000",
    fetch,
  }),
  cache: new InMemoryCache(),
});
