import express, { Router, Request, Response } from "express";
import auth from './auth.router'
import product from './product.router';

const router = Router();

router.use("/auth", auth);
router.use("/product", product);

export default router;
