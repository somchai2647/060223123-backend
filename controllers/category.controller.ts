import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function createCategory(req: Request, res: Response) {
  try {
    const categoryInput: Prisma.CategoryCreateInput = {
      name: req.body.name,
    };
    const category = await prisma.category.create({
      data: categoryInput,
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}

export async function getCategorys(req: Request, res: Response) {
  try {
    const withproduct = req.query.withproduct;
    const order = req.query.order;
    const category = await prisma.category.findMany({
      orderBy: {
        name: order === "desc" ? "desc" : "asc",
      },
      include: {
        Products:
          withproduct === "1"
            ? {
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
              }
            : false,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const withproduct = req.query.withproduct;
    const category = await prisma.category.findUnique({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
      include: {
        Products:
          withproduct === "1"
            ? {
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
              }
            : false,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const category = await prisma.category.update({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
      data: {
        name: req.body.name,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function destroyCategory(req: Request, res: Response) {
  try {
    const category = await prisma.category.delete({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
    });
    res.json(category);
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
