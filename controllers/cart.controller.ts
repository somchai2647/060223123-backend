import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function createCart(req: Request, res: Response) {
  try {
    const cartInput: Prisma.CartCreateInput = {
      quantity: req.body.quantity,
      User: {
        connect: {
          username: req.body.username,
        },
      },
      Products:{
        connect:{
          id: req.body.productid
        }
      }
    };
    const cart = await prisma.cart.create({
      data: cartInput,
    });
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
