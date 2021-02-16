import { Router } from "express";
import { facebookStrategyRoutes } from "./Facebook";
import { googleStrategyRoutes } from "./Google";

const router = Router();

router.use(googleStrategyRoutes);
router.use(facebookStrategyRoutes);

export { router as authRoutes };
