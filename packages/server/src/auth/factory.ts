import Tokens from "csrf";
import { Express, NextFunction, Request, Response } from "express";
import passport, { AuthenticateOptions, Profile } from "passport";
import { VerifyCallback } from "passport-oauth2";
import { ANTI_FORGERY_COOKIE, ANTI_FORGERY_SECRET } from "../constants";
import { loginCallback } from "./callback";
import { StrategyType } from "./types";

export const addPassportStrategy = (
    app: Express,
    type: StrategyType,
    Strategy: new (
        options: any,
        verify: (
            req: Request,
            accessToken: string,
            refreshToken: string,
            profile: any,
            verified: any
        ) => void
    ) => passport.Strategy,
    strategyOptions: any,
    authOptions: AuthenticateOptions = {}
) => {
    passport.use(
        new Strategy(
            {
                ...strategyOptions,
                callbackURL: `/auth/${type}/callback`,
                passReqToCallback: true
            },
            async (
                req: Request,
                accessToken: string,
                _refreshToken: string,
                profile: Profile,
                done: VerifyCallback
            ) => loginCallback(req, type, accessToken, profile, done)
        )
    );

    app.get(`/auth/${type}`, passport.authenticate(type, authOptions));

    const addCsrf = (req: Request, res: Response, next: NextFunction) => {
        const tokens = new Tokens();
        const secret = tokens.secretSync();
        const token = tokens.create(secret);

        res.cookie(ANTI_FORGERY_COOKIE, token);
        req.session[ANTI_FORGERY_SECRET] = secret;

        next();
    };

    const redirectCallback = (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.redirect(`${process.env.CLIENT_URL}/login?mode=redirect`);
        } else {
            res.redirect(`${process.env.CLIENT_URL}/login`);
        }
    };

    const authenticate = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate(type, (err, user) => {
            if (err) {
                res.redirect(`${process.env.CLIENT_URL}/error`);
            } else {
                req.logIn(user, () => {
                    next();
                });
            }
        })(req, res, next);
    };

    app.get(`/auth/${type}/callback`, [
        authenticate,
        addCsrf,
        redirectCallback
    ]);
};
