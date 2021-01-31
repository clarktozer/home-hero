import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BaseProvider, DarkTheme, LightTheme } from "baseui";
import { Theme } from "baseui/theme";
import React, { FC, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { Header } from "./components";
import {
    Home,
    Host,
    Listing,
    Listings,
    Login,
    NotFound,
    Stripe,
    User,
} from "./routes";
import { Store } from "./state/store";

const engine = new Styletron();

const stripePromise = loadStripe("");

export const App: FC = () => {
    const [theme, setTheme] = useState<Theme>(DarkTheme);

    const onToggleTheme = () => {
        setTheme(theme === DarkTheme ? LightTheme : DarkTheme);
    };

    return (
        <Provider store={Store}>
            <StyletronProvider value={engine}>
                <BaseProvider theme={theme}>
                    <Router>
                        <Header onToggleTheme={onToggleTheme} />
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/user/:id">
                                <User />
                            </Route>
                            <Route exact path="/host">
                                <Host />
                            </Route>
                            <Route exact path="/listing/:id">
                                <Elements stripe={stripePromise}>
                                    <Listing />
                                </Elements>
                            </Route>
                            <Route exact path="/listings/:location?">
                                <Listings />
                            </Route>
                            <Route exact path="/stripe">
                                <Stripe />
                            </Route>
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </BaseProvider>
            </StyletronProvider>
        </Provider>
    );
};
