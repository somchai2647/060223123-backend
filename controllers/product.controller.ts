import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProduct(req: Request, res: Response) {
  try {
    const productInput: Prisma.ProductsCreateInput = {
      name: req.body.name,
      desc: req.body.description,
      price: req.body.price,
      cost: req.body.cost,
      amountpage: Number(req.body.amountpage),
      stock: Number(req.body.stock),
      stockAlm: Number(req.body.stockAlm),
      discount: req.body.discount,
      category: {
        connect: {
          id: req.body.category,
        },
      },
      auther: {
        connect: {
          id: req.body.auther,
        },
      },
      publisher: {
        connect: {
          id: req.body.publisher,
        },
      },
    };
    const product = await prisma.products.create({
      data: productInput,
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}

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
      where: {
        isDelete: false,
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
        // @ts-ignore
        id: String(req.params.id),
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

export async function updateProduct(req: Request, res: Response) {
  try {
    const product = await prisma.products.update({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
      data: {
        name: req.body.name,
        price: req.body.price,
        desc: req.body.description,
        category: req.body.category_id,
        auther: req.body.auther_id,
        publisher: req.body.publisher_id,
        stock: req.body.stock,
        stockAlm: req.body.stockAlm,
        cost: req.body.cost,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const product = await prisma.products.update({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
      data: {
        isDelete: true,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function destroyProduct(req: Request, res: Response) {
  try {
    const product = await prisma.products.delete({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
    });
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
}
