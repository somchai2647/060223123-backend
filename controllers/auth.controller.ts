import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
require("dotenv").config();

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  const { username, fname, lname, email, password, tel } = req.body;
  try {
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

    if (user) {
      const token = jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET || "secret",
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
      );

      user.token = token;

      res.json(user);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({
          code: error.code,
          message: "ชื่อผู้ใช้หรืออีเมลถูกใช้งานแล้ว",
        });
      }
      // res.status(400).json({ error });
    }
  }
}
export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET || "secret",
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
      );

      user.token = token;
      //@ts-ignore
      delete user.password;

      res.json(user);
    } else {
      res.status(400).json({ message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
export async function checktoken(req: Request, res: Response) {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    return res.status(202).json(null);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if (decoded) {
      const user = await prisma.user.findUnique({
        where: {
          //@ts-ignore
          username: String(decoded.username),
        },
      });
      //@ts-ignore
      delete user.password;

      res.json({ ...user });
    }
  } catch (error) {
    res.status(202).json(null);
  }
}
export async function changePassword(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const encryptedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.user.update({
      where: {
        username,
      },
      data: {
        password: encryptedPassword,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export default { login, register, checktoken, changePassword };
