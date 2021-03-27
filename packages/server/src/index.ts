import compression from "compression";
import cookieParser from "cookie-parser";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { seed } from "./config";
import {
    addCors,
    addPassport,
    addSession,
    createApolloServer
} from "./middlewares";

dayjs.extend(isSameOrAfter);

const run = async () => {
    await createConnection();
    const app = express();

    app.use(
        express.json({
            limit: "2mb"
        })
    );
    app.use(compression());
    app.use(cookieParser());
    addCors(app);
    addSession(app);
    addPassport(app);

    if (process.env.NODE_ENV === "production") {
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
