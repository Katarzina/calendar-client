import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import * as process from "process";

//const url = "http://localhost:7777/graphql";

const httpLink = new HttpLink({
  uri: process.env.BACKEND_API, // Замените на ваш GraphQL endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
