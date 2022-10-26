import { Router } from "express";
import {
  createCart,
  getCart,
  deleteItem,
} from "../controllers/cart.controller";
import verifyToken from "../middlewares/auth";
const router = Router();

router.post("/createCart", createCart);
router.get("/getCart/:username", getCart);
// router.get("/getCategory/:id", getCategory);
// router.put("/updateCategory/:id", updateCategory);
// router.delete("/destroyCategory/:id", destroyCategory);
router.delete("/deleteItem/:id", deleteItem);

export default router;
