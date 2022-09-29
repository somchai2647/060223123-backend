import { Router } from "express";
import auth from "./auth.router";
import product from "./product.router";
import category from './category.router';

const router = Router();

router.use("/auth", auth);
router.use("/product", product);
router.use("/category", category);

export default router;
