import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function getProducts(req: Request, res: Response) {
  try {
    const allBooks = await prisma.products.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        auther: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        publisher: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });
    res.json(allBooks);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        auther: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        publisher: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
}
