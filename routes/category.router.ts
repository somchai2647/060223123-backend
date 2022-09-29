import { Router } from "express";
import {
  createCategory,
  getCategory,
  getCategorys,
  updateCategory,
  destroyCategory,
} from "../controllers/category.controller";
const router = Router();

router.post("/createCategory", createCategory);
router.get("/getCategory", getCategorys);
router.get("/getCategory/:id", getCategory);
router.put("/updateCategory/:id", updateCategory);
router.delete("/destroy/:id", destroyCategory);

export default router;
