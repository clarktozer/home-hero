import {
    Profile,
    Strategy,
    StrategyOptions,
    VerifyCallback
} from "passport-google-oauth20";
import { LoginCallback } from "../callback";

const options: StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "/auth/google/callback"
};

const callback = async (
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback
) => LoginCallback(accessToken, profile, done);

export const GoogleStrategy = new Strategy(options, callback);
