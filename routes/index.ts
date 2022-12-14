import { Router } from "express";
import auth from "./auth.router";
import product from "./product.router";
import category from "./category.router";
import author from "./author.router";
import publisher from "./publisher.router";
import user from "./user.router";
import cart from "./cart.router";
import order from "./order.router";
import profile from "./profile.router";
import review from './review.router'

import verifyToken from "../middlewares/auth";

const router = Router();

router.use("/auth", auth);
router.use("/profile", verifyToken, profile);
router.use("/category", category);

router.use("/cart", verifyToken, cart);
router.use("/order", order);
router.use("/review", review);
router.use("/user", user);
router.use("/product", product);
router.use("/author", author);
router.use("/publisher", publisher);

export default router;
