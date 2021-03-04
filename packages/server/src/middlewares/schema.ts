import { AuthChecker, buildSchema } from "type-graphql";
import {
    BookingResolver,
    ListingResolver,
    UserResolver
} from "../graphql/resolvers";
import { AppContext } from "./apollo/types";

export const createSchema = async () => {
    const authChecker: AuthChecker<AppContext> = ({ context }) =>
        context.req.isAuthenticated();

    const schema = await buildSchema({
        resolvers: [UserResolver, BookingResolver, ListingResolver],
        dateScalarMode: "timestamp",
        authChecker
    });

    return schema;
};
