import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connectDatabase } from "./database";
import { BookingResolver, ListingResolver, UserResolver } from "./resolvers";

const start = async () => {
    await connectDatabase();

    const app = express();
    app.use(bodyParser.json({ limit: "2mb" }));

    const schema = await buildSchema({
        resolvers: [UserResolver, BookingResolver, ListingResolver]
    });

    const server = new ApolloServer({
        schema
    });

    server.applyMiddleware({
        app,
        path: "/api"
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server started on :4000${server.graphqlPath}`);
    });
};

start();
