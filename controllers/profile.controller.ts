import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
require("dotenv").config();

const prisma = new PrismaClient();

export async function getProfile(req: Request, res: Response) {
  try {
    const profile = await prisma.user.findUnique({
      where: {
        //@ts-ignore
        username: req.user.username,
      },
      select: {
        username: true,
        fname: true,
        lname: true,
        points: true,
        email: true,
        address: true,
        tel: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const { fname, lname, email, address, tel } = req.body;
    const updatedProfile = await prisma.user.update({
      where: {
        //@ts-ignore
        username: req.user.username,
      },
      data: {
        fname,
        lname,
        email,
        address,
        tel,
      },
      select: {
        fname: true,
        lname: true,
        email: true,
        address: true,
        tel: true,
      },
    });
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json(error);
  }
}
