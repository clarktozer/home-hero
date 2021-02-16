import { Strategy, StrategyOption, VerifyFunction } from "passport-facebook";
import { LoginCallback } from "../callback";

const options: StrategyOption = {
    clientID: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "email", "displayName", "picture"]
};

const callback: VerifyFunction = async (
    accessToken,
    _refreshToken,
    profile,
    done
) => LoginCallback(accessToken, profile, done);

export const FacebookStrategy = new Strategy(options, callback);
