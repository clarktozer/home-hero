import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { SnackbarProvider } from "./components";
import reportWebVitals from "./reportWebVitals";
import { Store } from "./state/store";

const httpLink = createHttpLink({
    uri: "/api"
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={Store}>
            <SnackbarProvider>
                <Router>
                    <App />
                </Router>
            </SnackbarProvider>
        </Provider>
    </ApolloProvider>,
    document.getElementById("root")
);

reportWebVitals();
