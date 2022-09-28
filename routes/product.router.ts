import { Router } from "express";
import { getProduct, getProducts } from "../controllers/product.controllers";
const router = Router();

router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);

export default router;
