import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getCart } from "./cart.controller";
const prisma = new PrismaClient();

export async function createCheckout(req: Request, res: Response) {
  try {
    //@ts-ignore
    req.isinside = true;
    //@ts-ignore
    req.params.username = req.user.username;

    const cart = await getCart(req, res);

    const checkoutInput: Prisma.OrderCreateInput = {
      User: {
        connect: {
          //@ts-ignore
          username: req.user.username,
        },
      },
      status: "pending",
      paymethod: req.body.paymethod,
      OrderItem: {
        //@ts-ignore
        create: cart.map((item: any) => {
          const discount = (parseFloat(item.Products.discount) / 100) * parseFloat(item.Products.price);
          const price = (parseFloat(item.Products.price) - discount) * item.quantity;
          return {
            quantity: item.quantity,
            price: price,
            Products: {
              connect: {
                id: item.Products.id,
              },
            },
          };
        }),
      },
    };

    const checkout = await prisma.order.create({
      data: checkoutInput,
    });

    res.json(checkout);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}
