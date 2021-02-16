import passport from "passport";
import { FacebookStrategy, GoogleStrategy } from "../auth";
import { User } from "../entity";

passport.serializeUser<string>((user: any, done) => {
    done(null, user?.id);
});

passport.deserializeUser<string>(async (id, done) => {
    try {
        const user = await User.findOne(id);
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
