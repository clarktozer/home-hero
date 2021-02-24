import Tokens from "csrf";
import { MiddlewareFn } from "type-graphql";
import { AppContext } from "../../middlewares/apollo/types";

export const ValidAntiForgeryToken: MiddlewareFn<AppContext> = (
    { context },
    next
) => {
    const tokens = new Tokens();
    const token = context.req.cookies.hhcsrf;
    const secret = context.req.session.csrfSecret;

    if (!secret || !tokens.verify(secret, token)) {
        throw new Error("Unauthorized");
    }

    return next();
};
