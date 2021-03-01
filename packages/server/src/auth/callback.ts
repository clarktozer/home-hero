import { Request } from "express";
import { Profile } from "passport";
import { VerifyCallback } from "passport-oauth2";
import { SocialAccount, User } from "../graphql/entities";
import { StrategyType } from "./types";

export const loginCallback = async (
    req: Request,
    service: StrategyType,
    accessToken: string,
    profile: Profile,
    done: VerifyCallback
) => {
    try {
        const userProps = {
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : "",
            avatar: profile.photos ? profile.photos[0].value : ""
        };

        const socialProps = {
            id: profile.id,
            token: accessToken,
            strategy: service,
            ...userProps
        };

        if (req.user) {
            const user = await User.findOne(req.user.id);

            if (user) {
                const createSocial = SocialAccount.create(socialProps);
                createSocial.user = Promise.resolve(user);
                await createSocial.save();

                return done(undefined, user);
            } else {
                return done(undefined, false);
            }
        } else {
            const account = await SocialAccount.findOne(profile.id, {
                relations: ["user"]
            });

            if (account) {
                account.name = profile.displayName;
                account.email = profile.emails ? profile.emails[0].value : "";
                account.avatar = profile.photos ? profile.photos[0].value : "";
                account.token = accessToken;

                await account.save();
                const user = await account.user;

                return done(undefined, user);
            } else {
                const user = await User.findOne({
                    where: {
                        email: userProps.email
                    }
                });

                if (user) {
                    const createSocial = SocialAccount.create(socialProps);
                    createSocial.user = Promise.resolve(user);
                    await createSocial.save();

                    return done(undefined, user);
                } else {
                    const createUser = User.create(userProps);
                    const newUser = await createUser.save();

                    const createSocial = SocialAccount.create(socialProps);
                    createSocial.user = Promise.resolve(newUser);
                    await createSocial.save();

                    return done(undefined, newUser);
                }
            }
        }
    } catch (error) {
        return done(error);
    }
};
