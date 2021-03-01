import { Express } from "express";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { StrategyType } from "../../auth";
import { addPassportStrategy } from "../../auth/factory";
import { User } from "../../graphql/entities";

export const addPassport = (app: Express) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser<string>((user: any, done) => {
        done(null, user?.id);
    });

    passport.deserializeUser<string>(async (id, done) => {
        try {
            const user = await User.findOne(id);

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error, false);
        }
    });

    addPassportStrategy(
        app,
        StrategyType.Github,
        GitHubStrategy,
        {
            clientID: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        },
        {
            scope: ["read:user"]
        }
    );

    addPassportStrategy(
        app,
        StrategyType.Google,
        GoogleStrategy,
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        },
        {
            scope: ["profile", "email"]
        }
    );

    addPassportStrategy(
        app,
        StrategyType.Facebook,
        FacebookStrategy,
        {
            clientID: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
            profileFields: ["id", "email", "displayName", "picture"]
        },
        {
            scope: ["user:email"]
        }
    );
};
