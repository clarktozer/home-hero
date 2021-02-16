import { Profile } from "passport";
import { VerifyCallback } from "passport-google-oauth20";
import { User } from "../graphql/entities";

export const LoginCallback = async (
    accessToken: string,
    profile: Profile,
    done: VerifyCallback
) => {
    try {
        const user = await User.findOne(profile.id);
        const userProps = {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : "",
            avatar: profile.photos ? profile.photos[0].value : "",
            token: accessToken
        };

        if (user) {
            user.name = "Clark Tower";
            user.email = userProps.email;
            user.avatar = userProps.avatar;
            user.token = userProps.token;

            const updatedUser = await user.save();

            return done(undefined, updatedUser);
        } else {
            const create = User.create(userProps);
            const newUser = await create.save();

            return done(undefined, newUser);
        }
    } catch (error) {
        return done(error);
    }
};
