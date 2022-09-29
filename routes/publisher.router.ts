import { Router } from "express";
import {
  createPublisher,
  getPublisher,
  getPublishers,
  updatePublisher,
  destroyPublisher,
} from "../controllers/publisher.controller";
const router = Router();

router.post("/createPublisher", createPublisher);
router.get("/getPublisher", getPublishers);
router.get("/getPublisher/:id", getPublisher);
router.put("/updatePublisher/:id", updatePublisher);
router.delete("/destroyPublisher/:id", destroyPublisher);

export default router;
