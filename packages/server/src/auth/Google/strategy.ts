import {
    Profile,
    Strategy,
    StrategyOptions,
    VerifyCallback
} from "passport-google-oauth20";

const options: StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "/auth/google/callback"
};

const callback = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
) => {
    console.log(accessToken);
    console.log(profile);
    console.log(refreshToken);
    return done(undefined, profile);
};

export const GoogleStrategy = new Strategy(options, callback);
