import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

const httpLink = createHttpLink({
    uri: "/api",
    credentials: "include"
});

const authLink = setContext((_, { headers }) => {
    // const token = getToken()["X-CSRF-TOKEN"];
    return {
        headers: {
            ...headers,
            "X-CSRF-TOKEN": ""
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

reportWebVitals();
