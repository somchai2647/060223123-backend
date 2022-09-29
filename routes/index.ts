import { Router } from "express";
import auth from "./auth.router";
import product from "./product.router";
import category from './category.router';
import auther from "./auther.router"

const router = Router();

router.use("/auth", auth);
router.use("/product", product);
router.use("/category", category);
router.use("/auther", auther);

export default router;
