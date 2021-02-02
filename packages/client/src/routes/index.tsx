import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Host } from "./Host";
import { Listing } from "./Listing";
import { Listings } from "./Listings";
import { Login } from "./Login";
import { NotFound } from "./NotFound";
import { Stripe } from "./Stripe";
import { User } from "./User";

const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

export const Routes: FC = () => (
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
);
