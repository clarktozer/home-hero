import { ApolloError, ApolloServer } from "apollo-server-express";
import { Express } from "express";
import {
    fieldExtensionsEstimator,
    getComplexity,
    simpleEstimator
} from "graphql-query-complexity";
import { AuthChecker, buildSchema } from "type-graphql";
import { BookingResolver, ListingResolver, UserResolver } from "../resolvers";
import { AppContext } from "./types";

export const createApolloServer = async (app: Express) => {
    const authChecker: AuthChecker<AppContext> = ({ context }) =>
        context.req.user !== undefined;

    const schema = await buildSchema({
        resolvers: [UserResolver, BookingResolver, ListingResolver],
        dateScalarMode: "timestamp",
        emitSchemaFile: false,
        authChecker
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
        ],
        context: ({ req }) => ({ req }),
        introspection: process.env.NODE_ENV === "development",
        playground: process.env.NODE_ENV === "development"
    });

    server.applyMiddleware({
        app,
        path: "/api"
    });

    return server;
};
