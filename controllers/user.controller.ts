import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
require("dotenv").config();

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  try {
    const { username, fname, lname, email, password, tel } = req.body;
    const encryptedPassword = await bcryptjs.hash(password, 10);
    const userInput: Prisma.UserCreateInput = {
      username,
      fname,
      lname,
      email: email.toLowerCase(),
      password: encryptedPassword,
      tel,
    };
    const user = await prisma.user.create({
      data: userInput,
    });

    res.json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({
          code: error.code,
          error: "ชื่อผู้ใช้หรืออีเมลถูกใช้งานแล้ว",
        });
      }
      res.status(400).json({ error });
    }
  }
}

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      select: {
        password: false,
      },
      where: {
        //@ts-ignore
        id: String(id),
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { username, fname, lname, email, tel } = req.body;
    const user = await prisma.user.update({
      where: {
        //@ts-ignore
        id: String(id),
      },
      data: {
        username,
        fname,
        lname,
        email,
        tel,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        //@ts-ignore
        id: String(id),
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        password: false,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
}