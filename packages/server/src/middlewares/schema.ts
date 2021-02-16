import { buildSchema } from "type-graphql";
import {
    BookingResolver,
    ListingResolver,
    UserResolver
} from "../graphql/resolvers";

export const createSchema = async () => {
    const schema = await buildSchema({
        resolvers: [UserResolver, BookingResolver, ListingResolver],
        dateScalarMode: "timestamp",
        emitSchemaFile: false,
        authChecker: ({ context }) => context.req.user !== undefined
    });

    return schema;
};
