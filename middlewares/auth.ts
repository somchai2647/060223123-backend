import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, การอนุญาตถูกปฏิเสธ" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    //@ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token ไม่ถูกต้อง หรือ หมดอายุ" });
  }
}

export default auth;