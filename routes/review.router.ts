import { Router } from "express";
import {
  createReview,
  getReviewProducts,
  getReviews,
  destroyReview
} from "../controllers/review.controller";
const router = Router();

router.post("/createRreview", createReview);
router.get("/getReviewProducts", getReviewProducts);
router.delete("/destroyReview/:", getReviews);

export default router;
