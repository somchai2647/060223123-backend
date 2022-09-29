import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function createAuther(req: Request, res: Response) {
  try {
    const autherInput: Prisma.AutherCreateInput = {
      name: req.body.name,
      email: req.body.email,
    };
    const auther = await prisma.auther.create({
      data: autherInput,
    });
    res.json(auther);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}

export async function getAuthers(req: Request, res: Response) {
  try {
    const withProduct = req.query.withProduct;
    
    const auther = await prisma.auther.findMany({
      include: {
        Products: withProduct === "1" ? true : false,
      },
    });
    res.json(auther);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getAuther(req: Request, res: Response) {
  try {
    const withProduct = req.query.withProduct;
    const auther = await prisma.auther.findUnique({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
      include: {
        Products: withProduct === "1" ? true : false,
      },
    });
    res.json(auther);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function updateAuther(req: Request, res: Response) {
  try {
    const auther = await prisma.auther.update({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.json(auther);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function destroyAuther(req: Request, res: Response) {
  try {
    const auther = await prisma.auther.delete({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
    });
    res.json(auther);
  } catch (error) {
    res.status(400).json(error);
  }
}

// export async function deleteProduct(req: Request, res: Response) {
//     try {
//       const product = await prisma.products.update({
//         where: {
//           // @ts-ignore
//           id: String(req.params.id),
//         },
//         data: {
//           isDelete: true,
//         },
//       });
//       res.json(product);
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   }
