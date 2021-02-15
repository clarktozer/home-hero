import { Strategy, StrategyOption, VerifyFunction } from "passport-facebook";
import { User } from "../../entity";

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

export const FacebookStrategy = new Strategy(options, callback);
