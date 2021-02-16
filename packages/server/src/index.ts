import bodyParser from "body-parser";
import express from "express";
import passport from "passport";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { authRoutes } from "./auth";
import { seed } from "./config/seed";
import { createApolloServer } from "./middlewares/apollo";
import { createPassport } from "./middlewares/passport";
import { createSession } from "./middlewares/session";

const start = async () => {
    await createConnection();
    createPassport();
    const app = express();

    app.use(bodyParser.json({ limit: "2mb" }));
    app.use(createSession());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(authRoutes);

    if (process.env.NODE_ENV === "development") {
        await seed();
    }

    const server = await createApolloServer(app);

    app.listen(process.env.PORT, () => {
        console.log(
            `Server started on http://localhost:${process.env.PORT}${server.graphqlPath}`
        );
    });
};

start();
