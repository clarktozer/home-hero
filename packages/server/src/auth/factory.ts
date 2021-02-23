import { Express, NextFunction, Request, Response } from "express";
import passport, { AuthenticateOptions, Profile } from "passport";
import { VerifyCallback } from "passport-oauth2";
import { loginCallback } from "./callback";

export const addPassportStrategy = (
    app: Express,
    service: string,
    Strategy: new (
        options: any,
        verify: (
            accessToken: string,
            refreshToken: string,
            profile: any,
            verified: any
        ) => void
    ) => passport.Strategy,
    strategyOptions: any,
    authOptions: AuthenticateOptions = {},
    callbackAuthOptions: AuthenticateOptions = {
        failureRedirect: `${process.env.CLIENT_URL}/login`,
        successRedirect: `${process.env.CLIENT_URL}`,
        passReqToCallback: true
    }
) => {
    const { successRedirect, ...rest } = callbackAuthOptions;

    passport.use(
        new Strategy(
            {
                ...strategyOptions,
                callbackURL: `/auth/${service}/callback`
            },
            async (
                accessToken: string,
                _refreshToken: string,
                profile: Profile,
                done: VerifyCallback
            ) => loginCallback(service, accessToken, profile, done)
        )
    );

    const addRedirect = (req: Request, _res: Response, next: NextFunction) => {
        if (req.query.redirect && typeof req.query.redirect === "string") {
            req.session.redirectTo = req.query.redirect;
        }

        next();
    };

    app.get(
        `/auth/${service}`,
        addRedirect,
        passport.authenticate(service, authOptions)
    );

    const redirectCallback = (req: Request, res: Response) => {
        res.cookie("hhcsrf", req.csrfToken());
        const redirect = req.session?.redirectTo
            ? `${process.env.CLIENT_URL}${req.session.redirectTo}`
            : successRedirect || "";

        if (req.session?.redirectTo) {
            req.session.redirectTo = undefined;
        }

        res.redirect(redirect);
    };

    app.get(
        `/auth/${service}/callback`,
        passport.authenticate(service, rest),
        redirectCallback
    );
};
