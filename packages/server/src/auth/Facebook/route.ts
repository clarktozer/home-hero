import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/api",
        failureRedirect: "/api"
    })
);

export { router as facebookStrategyRoutes };
