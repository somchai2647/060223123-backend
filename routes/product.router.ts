import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  destroyProduct
} from "../controllers/product.controllers";
const router = Router();

router.post("/createProduct", createProduct);
router.get("/getProduct", getProducts);
router.get("/getProduct/:id", getProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.delete("/destroy/:id", destroyProduct);

export default router;
