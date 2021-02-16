import passport from "passport";
import { FacebookStrategy, GoogleStrategy } from "../auth";
import { User as UserEntity } from "../graphql/entities";

export const createPassport = () => {
    passport.serializeUser<string>((user: any, done) => {
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

    passport.use(FacebookStrategy);
    passport.use(GoogleStrategy);
};
