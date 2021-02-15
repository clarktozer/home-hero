import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import passport from "passport";
import { facebookStrategyRoutes, googleStrategyRoutes } from "../auth";
import { redis } from "./redis";

export const createApp = async () => {
    const app = express();

    app.use(bodyParser.json({ limit: "2mb" }));

    const RedisStore = connectRedis(session);

    app.use(
        session({
            store: new RedisStore({
                client: redis
            }),
            name: "qid",
            secret: "aslkdfjoiq12312",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(googleStrategyRoutes);
    app.use(facebookStrategyRoutes);

    return app;
};
