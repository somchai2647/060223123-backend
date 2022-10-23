import { Router } from "express";
import auth from "../controllers/auth.controller";
const router = Router();

router.post("/login", auth.login);
router.post("/register", auth.register);
router.get("/checktoken", auth.checktoken);

export default router;
