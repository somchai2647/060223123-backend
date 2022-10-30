import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getCart } from "./cart.controller";
const prisma = new PrismaClient();

export async function createCheckout(req: Request, res: Response) {
  try {
    const cart = await getCart(req, res);
    const checkoutInput: Prisma.OrderCreateInput = {
      paymethod: req.body.paymethod,
      User: {
        connect: {
          //@ts-ignore
          username: req?.user?.username,
        },
      },
      OrderItem: {
        create: req.body.cart.map((item: any) => {
          return {
            quantity: item.quantity,
            Products: {
              connect: {
                id: item.productid,
              },
            },
          };
        }),
      },
      status: "PENDING",
    };
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}
