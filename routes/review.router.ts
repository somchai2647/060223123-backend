import { Router } from "express";
import {
  createReview,
  getReviewProducts,
  updateReview,
  getReviews,
  destroyReview,
} from "../controllers/review.controller";
const router = Router();
import verifyToken from "../middlewares/auth";

router.get("/getReviews", getReviews);
router.put("/updateReview/:id", updateReview);
router.delete("/destroyReview/:id", destroyReview);
router.get("/getReviewProducts", getReviewProducts);
router.post("/createReview", verifyToken, createReview);

export default router;
