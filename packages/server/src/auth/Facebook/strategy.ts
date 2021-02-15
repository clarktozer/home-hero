import { Strategy, StrategyOption, VerifyFunction } from "passport-facebook";

const options: StrategyOption = {
    clientID: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "email", "first_name", "last_name"]
};

const callback: VerifyFunction = (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(profile);
    console.log(refreshToken);
    done(null, undefined);
};

export const FacebookStrategy = new Strategy(options, callback);
