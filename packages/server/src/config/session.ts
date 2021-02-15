import connectRedis from "connect-redis";
import session from "express-session";
import { redis } from "./redis";

export const getSession = () => {
    const RedisStore = connectRedis(session);

    return session({
        store: new RedisStore({
            client: redis
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    });
};
