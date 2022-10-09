import { Router } from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/user.controller";
const router = Router();

router.post("/createUser", createUser);
router.get("/getUser", getUsers);
router.get("/getUser/:id", getUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
