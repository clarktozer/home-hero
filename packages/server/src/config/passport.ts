import passport from "passport";
import { FacebookStrategy, GoogleStrategy } from "../auth";

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

passport.use(FacebookStrategy);

passport.use(GoogleStrategy);
