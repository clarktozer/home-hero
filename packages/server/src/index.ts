import bodyParser from "body-parser";
import express from "express";
import passport from "passport";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { seed } from "./config/seed";
import {
    createApolloServer,
    createPassport,
    createSession
} from "./middlewares";

const start = async () => {
    await createConnection();
    const app = express();

    app.use(bodyParser.json({ limit: "2mb" }));
    app.use(createSession());
    app.use(passport.initialize());
    app.use(passport.session());
    createPassport(app);

    if (process.env.NODE_ENV === "development") {
        await seed();
    }

    const server = await createApolloServer(app);

    app.listen(process.env.PORT, () => {
        console.log(
            `Server started on ${process.env.PUBLIC_URL}:${process.env.PORT}${server.graphqlPath}`
        );
    });
};

start();
