import { ApolloError, ApolloServer } from "apollo-server-express";
import { Express } from "express";
import {
    fieldExtensionsEstimator,
    getComplexity,
    simpleEstimator
} from "graphql-query-complexity";
import { createSchema } from "../schema";
import { AppContext } from "./types";

export const createApolloServer = async (app: Express) => {
    const schema = await createSchema();

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
        context: ({ req, res }): AppContext => ({ req, res }),
        playground: process.env.NODE_ENV === "development"
    });

    server.applyMiddleware({
        app,
        path: "/api"
    });

    return server;
};
