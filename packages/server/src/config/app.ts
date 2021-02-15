import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import passport from "passport";
import { v4 } from "uuid";
import { facebookStrategyRoutes, googleStrategyRoutes } from "../auth";

export const createApp = async () => {
    const app = express();

    app.use(bodyParser.json({ limit: "2mb" }));

    app.use(
        session({
            genid: () => v4(),
            secret: "secret",
            resave: false,
            saveUninitialized: false
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(googleStrategyRoutes);
    app.use(facebookStrategyRoutes);

    return app;
};
