import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  destroyProduct,
  getProdctGroup
} from "../controllers/product.controller";
const router = Router();

router.post("/createProduct", createProduct);
router.get("/getProduct", getProducts);
router.get("/getProduct/:id", getProduct);
router.get("/getProdctGroup", getProdctGroup);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.delete("/destroyProduct/:id", destroyProduct);

export default router;
