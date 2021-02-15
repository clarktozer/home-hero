import bodyParser from "body-parser";
import express from "express";
import passport from "passport";
import { facebookStrategyRoutes, googleStrategyRoutes } from "../auth";
import { getSession } from "./session";

export const createApp = async () => {
    const app = express();

    app.use(bodyParser.json({ limit: "2mb" }));
    app.use(getSession());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(googleStrategyRoutes);
    app.use(facebookStrategyRoutes);

    return app;
};
