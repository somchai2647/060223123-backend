import { Router } from "express";
import {
  createAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
  destroyAuthor,
} from "../controllers/author.controller";
const router = Router();

router.post("/createAuthor", createAuthor);
router.get("/getAuthor", getAuthors);
router.get("/getAuthor/:id", getAuthor);
router.put("/updateAuthor/:id", updateAuthor);
router.delete("/destroyAuthor/:id", destroyAuthor);

export default router;
