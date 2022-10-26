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
      Products: {
        connect: {
          id: req.body.productid,
        },
      },
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

export async function getCart(req: Request, res: Response) {
  try {
    //@ts-ignore
    if (req.params.username !== req.user.username) {
      throw Error("You are not authorized to view this cart");
    }
    const cart = await prisma.cart.findMany({
      where: {
        User: {
          //@ts-ignore
          username: req?.user?.username || "admin",
        },
      },
      include: {
        Products: {
          include: {
            image: {
              orderBy: {
                type: "asc",
              },
              select: {
                url: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (cart.length === 0) {
      res.json([]);
    } else {
      res.json(cart);
    }
  } catch (error) {
    console.log(error);
    //@ts-ignore
    res.status(400).json({ error: error.message });
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    const cart = await prisma.cart.delete({
      where: {
        id: String(req.params.id),
      },
    });
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
