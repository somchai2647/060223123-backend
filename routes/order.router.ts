import { Router } from "express";
import {
  createCheckout,
  getOrders,
  updateOrder,
  getMyOrder,
} from "../controllers/order.controller";
const router = Router();
import verifyToken from "../middlewares/auth";

router.get("/getOrders", getOrders);
router.get("/getMyOrder", verifyToken, getMyOrder);
router.put("/updateOrder/:id", verifyToken, updateOrder);
router.post("/createCheckout", verifyToken, createCheckout);

export default router;
