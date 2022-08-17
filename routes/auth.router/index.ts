import express, { Router, Request, Response } from "express";
import auth from '../../controllers/auth.controllers'
const router = Router();


router.use("/login", auth.login);

export default router;