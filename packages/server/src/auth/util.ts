import Tokens from "csrf";
import { Request } from "express";
import { ANTI_FORGERY_COOKIE, ANTI_FORGERY_SECRET } from "../constants";

export const isAuthorized = async (req: Request): Promise<boolean> => {
    const tokens = new Tokens();
    const token = req.cookies[ANTI_FORGERY_COOKIE];
    const secret = req.session[ANTI_FORGERY_SECRET];

    return token && secret && !tokens.verify(secret, token);
};
