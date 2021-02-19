import { Express } from "express";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { addPassportStrategy } from "../../auth/factory";
import { User as UserEntity } from "../../graphql/entities";
import { User } from "./types";

export const createPassport = (app: Express) => {
    passport.serializeUser<string>((user: User, done) => {
        done(null, user?.id);
    });

    passport.deserializeUser<string>(async (id, done) => {
        try {
            const user = await UserEntity.findOne(id);

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
        "github",
        GitHubStrategy,
        {
            clientID: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        },
        {
            scope: ["user:email"]
        }
    );

    addPassportStrategy(
        app,
        "google",
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
        "facebook",
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
