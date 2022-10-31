import { Router } from "express";
import { createCheckout, getOrders } from "../controllers/order.controller";
const router = Router();
import verifyToken from "../middlewares/auth";

router.post("/createCheckout", verifyToken, createCheckout);
router.get("/getOrders", getOrders);

export default router;
