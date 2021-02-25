import { ValidAntiForgeryToken as ValidAntiForgeryTokenMiddleware } from "type-graphql-csrf-middleware";
import { ANTI_FORGERY_COOKIE, ANTI_FORGERY_SECRET } from "../../constants";

export const ValidAntiForgeryToken = ValidAntiForgeryTokenMiddleware({
    cookieKey: ANTI_FORGERY_COOKIE,
    secretKey: ANTI_FORGERY_SECRET
});
