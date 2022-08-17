import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function login(req: Request, res: Response) {
  try {
    const user = await prisma.user.findMany({});
    res.json(user);
  } catch (error) {}
}

export default { login };
