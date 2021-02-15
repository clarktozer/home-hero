import passport from "passport";
import { FacebookStrategy, GoogleStrategy } from "../auth";
import { User } from "../entity";

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((user: any, done) => {
    User.findOne(user.id)
        .then(found => {
            done(null, found);
        })
        .catch(error => {
            done(error);
        });
});

passport.use(FacebookStrategy);

passport.use(GoogleStrategy);
