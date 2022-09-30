import { Router } from "express";
import auth from "../controllers/auth.controller";
const router = Router();

router.use("/login", auth.login);
router.use("/register", auth.register);

export default router;
