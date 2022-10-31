import { Router } from "express";
import {
  createCheckout,
  getOrders,
  updateOrder,
} from "../controllers/order.controller";
const router = Router();
import verifyToken from "../middlewares/auth";

router.get("/getOrders", getOrders);
router.put("/updateOrder/:id", verifyToken, updateOrder);
router.post("/createCheckout", verifyToken, createCheckout);

export default router;
