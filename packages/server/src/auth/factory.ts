import Tokens from "csrf";
import { Express, NextFunction, Request, Response } from "express";
import passport, { AuthenticateOptions, Profile } from "passport";
import { VerifyCallback } from "passport-oauth2";
import { stringify } from "qs";
import { ANTI_FORGERY_COOKIE, ANTI_FORGERY_SECRET } from "../constants";
import { loginCallback } from "./callback";
import { StrategyType } from "./types";

export const addPassportStrategy = (
    app: Express,
    type: StrategyType,
    Strategy: new (
        options: any,
        verify: (
            request: Request,
            accessToken: string,
            refreshToken: string,
            profile: any,
            verified: any
        ) => void
    ) => passport.Strategy,
    strategyOptions: any,
    authOptions: AuthenticateOptions = {}
) => {
    let redirectUrl: string | null = null;

    passport.use(
        new Strategy(
            {
                ...strategyOptions,
                callbackURL: `/auth/${type}/callback`,
                passReqToCallback: true
            },
            async (
                request: Request,
                accessToken: string,
                _refreshToken: string,
                profile: Profile,
                done: VerifyCallback
            ) => loginCallback(request, type, accessToken, profile, done)
        )
    );

    const addRedirect = (
        request: Request,
        _response: Response,
        next: NextFunction
    ) => {
        if (
            request.query.redirect &&
            typeof request.query.redirect === "string"
        ) {
            redirectUrl = request.query.redirect;
        }

        next();
    };

    app.get(
        `/auth/${type}`,
        addRedirect,
        passport.authenticate(type, authOptions)
    );

    const addCsrf = (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        const tokens = new Tokens();
        const secret = tokens.secretSync();
        const token = tokens.create(secret);

        response.cookie(ANTI_FORGERY_COOKIE, token);
        request.session[ANTI_FORGERY_SECRET] = secret;

        next();
    };

    const redirectCallback = (request: Request, response: Response) => {
        const query: Record<string, string> = {};

        if (request.isAuthenticated()) {
            query["redirect"] = "true";
        }

        if (redirectUrl) {
            query["url"] = redirectUrl;
        }

        response.redirect(
            `${process.env.CLIENT_URL}/login?${stringify(query)}`
        );
    };

    const authenticate = (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        passport.authenticate(type, (err, user) => {
            if (err) {
                response.redirect(`${process.env.CLIENT_URL}/error`);
            } else {
                request.logIn(user, () => {
                    next();
                });
            }
        })(request, response, next);
    };

    app.get(`/auth/${type}/callback`, [
        authenticate,
        addCsrf,
        redirectCallback
    ]);
};
