import passport from "passport";
import { FacebookStrategy, GoogleStrategy } from "../auth";

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(id);
    done(null, undefined);
});

passport.use(FacebookStrategy);

passport.use(GoogleStrategy);
