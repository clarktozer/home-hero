import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { seed } from "./config/seed";
import {
    addCors,
    addCSRF,
    addPassport,
    addSession,
    createApolloServer
} from "./middlewares";

const run = async () => {
    await createConnection();
    const app = express();

    addCors(app);
    addSession(app);
    addPassport(app);
    addCSRF(app);

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

run();
