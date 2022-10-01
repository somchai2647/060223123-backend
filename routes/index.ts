import { Router } from "express";
import auth from "./auth.router";
import product from "./product.router";
import category from './category.router';
import auther from "./auther.router"
import publisher from "./publisher.router"

import verifyToken from '../middlewares/auth';

const router = Router();

router.use("/auth", auth);

// router.use(verifyToken);
router.use("/product", product);
router.use("/category", category);
router.use("/auther", auther);
router.use("/publisher", publisher);

export default router;
