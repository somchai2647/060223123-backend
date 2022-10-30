import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller";
const router = Router();

router.get("/getProfile", getProfile);
router.put("/updateProfile", updateProfile);

export default router;
