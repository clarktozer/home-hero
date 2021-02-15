import {
    Profile,
    Strategy,
    StrategyOptions,
    VerifyCallback
} from "passport-google-oauth20";
import { User } from "../../entity";

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
) => {
    const create = User.create({
        id: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : "",
        avatar: profile.photos ? profile.photos[0].value : "",
        token: accessToken
    });

    const user = await create.save();

    return done(undefined, user);
};

export const GoogleStrategy = new Strategy(options, callback);
