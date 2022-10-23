import { Router } from "express";
import { createCart } from "../controllers/cart.controller";
const router = Router();

router.post("/createCart", createCart);
// router.get("/getCategory", getCategorys);
// router.get("/getCategory/:id", getCategory);
// router.put("/updateCategory/:id", updateCategory);
// router.delete("/destroyCategory/:id", destroyCategory);

export default router;
