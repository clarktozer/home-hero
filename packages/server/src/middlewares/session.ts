import connectRedis from "connect-redis";
import { Express } from "express";
import session from "express-session";
import { redis } from "../config/redis";

export const addSession = (app: Express) => {
    const RedisStore = connectRedis(session);

    if (process.env.NODE_ENV === "development") {
        redis.flushdb();
    }

    app.use(
        session({
            store: new RedisStore({
                client: redis
            }),
            name: process.env.SESSION_NAME as string,
            secret: process.env.SESSION_SECRET as string,
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
