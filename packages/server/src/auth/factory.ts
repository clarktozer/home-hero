import { Express } from "express";
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
    authOptions: AuthenticateOptions = {}
) => {
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
            ) => loginCallback(accessToken, profile, done)
        )
    );

    app.get(`/auth/${service}`, passport.authenticate(service, authOptions));

    app.get(
        `/auth/${service}/callback`,
        passport.authenticate(service, {
            failureRedirect: "/login",
            successReturnToOrRedirect: "/"
        })
    );
};
