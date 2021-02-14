import { ApolloError, ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import express from "express";
import {
    fieldExtensionsEstimator,
    getComplexity,
    simpleEstimator
} from "graphql-query-complexity";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { v4 } from "uuid";
import { connectDatabase } from "./database";
import { Listing, User } from "./entity";
import { ListingType } from "./entity/Listing/types";
import { BookingResolver, ListingResolver, UserResolver } from "./resolvers";

const start = async () => {
    await connectDatabase();

    await seed();

    const app = express();

    app.use(bodyParser.json({ limit: "2mb" }));

    const schema = await buildSchema({
        resolvers: [UserResolver, BookingResolver, ListingResolver],
        dateScalarMode: "timestamp",
        emitSchemaFile: true
    });

    const server = new ApolloServer({
        schema,
        plugins: [
            {
                requestDidStart: () => ({
                    didResolveOperation({ request, document }) {
                        const complexity = getComplexity({
                            schema,
                            operationName: request.operationName,
                            query: document,
                            variables: request.variables,
                            estimators: [
                                fieldExtensionsEstimator(),
                                simpleEstimator({ defaultComplexity: 1 })
                            ]
                        });

                        if (complexity > 20) {
                            throw new ApolloError(
                                `Maximum complexity exceeded.`,
                                "COMPLEXITY_ERROR"
                            );
                        }
                    }
                })
            }
        ]
    });

    server.applyMiddleware({
        app,
        path: "/api"
    });

    app.listen(process.env.PORT, () => {
        console.log(
            `Server started on http://localhost:${process.env.PORT}${server.graphqlPath}`
        );
    });
};

const seed = async () => {
    const user = User.create({
        id: "5d378db94e84753160e08b55",
        token: "token_************",
        name: "James J.",
        avatar:
            "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
        contact: "james@tinyhouse.com",
        income: 723796
    });

    await user.save();

    const listing1 = Listing.create({
        id: v4(),
        title: "Clean and fully furnished apartment. 5 min away from CN Tower",
        description:
            "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower, Scotiabank Arena, and Rogers Center.",
        image:
            "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
        type: ListingType.Apartment,
        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
        country: "Canada",
        admin: "Ontario",
        city: "Toronto",
        price: 12424,
        guests: 3
    });
    await listing1.save();

    const listing2 = Listing.create({
        id: v4(),
        title: "Cozy, clean, and affordable studio in midtown",
        description:
            "Cozy, clean, and affordable studio located around midtown. Perfect for a solo traveller on a budget.",
        image:
            "https://res.cloudinary.com/tiny-house/image/upload/v1560641351/mock/Toronto/toronto-listing-2_aeg1rw.jpg",
        type: ListingType.Apartment,
        address: "7009 Strawberry Street, Toronto, ON, CA",
        country: "Canada",
        admin: "Ontario",
        city: "Toronto",
        price: 15806,
        guests: 3
    });
    await listing2.save();

    user.listings = Promise.resolve([listing1, listing2]);
    await user.save();
};

start();
