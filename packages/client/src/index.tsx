import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from "@apollo/client";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isToday from "dayjs/plugin/isToday";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { SnackbarProvider } from "./components";
import reportWebVitals from "./reportWebVitals";
import { Store } from "./state/store";

dayjs.extend(isSameOrAfter);
dayjs.extend(isToday);

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
