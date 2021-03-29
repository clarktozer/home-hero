import connectRedis from "connect-redis";
import { Express } from "express";
import session from "express-session";
import { redis } from "../config";
import { SESSION_COOKIE } from "../constants";

export const addSession = (app: Express) => {
    const RedisStore = connectRedis(session);

    app.use(
        session({
            store: new RedisStore({
                client: redis
            }),
            name: SESSION_COOKIE,
            secret: `${process.env.SESSION_SECRET}`,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
            }
        })
    );
};
