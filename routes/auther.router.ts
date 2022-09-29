import { Router } from "express";
import {
  createAuther,
  getAuther,
  getAuthers,
  updateAuther,
  destroyAuther,
} from "../controllers/auther.controller";
const router = Router();

router.post("/createAuther", createAuther);
router.get("/getAuther", getAuthers);
router.get("/getAuther/:id", getAuther);
router.put("/updateAuther/:id", updateAuther);
router.delete("/destroyAuther/:id", destroyAuther);

export default router;
