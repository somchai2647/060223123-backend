import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function createAuthor(req: Request, res: Response) {
  try {
    const authorInput: Prisma.AuthorCreateInput = {
      name: req.body.name,
      email: req.body.email,
    };
    const author = await prisma.author.create({
      data: authorInput,
    });
    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}

export async function getAuthors(req: Request, res: Response) {
  try {
    const withproduct = req.query.withproduct;

    const author = await prisma.author.findMany({
      include: {
        Products:
          withproduct === "1"
            ? {
                include: {
                  image: {
                    select: {
                      url: true,
                    },
                  },
                },
              }
            : false,
      },
    });
    res.json(author);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getAuthor(req: Request, res: Response) {
  try {
    const withproduct = req.query.withproduct;
    const author = await prisma.author.findUnique({
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
                    select: {
                      url: true,
                    },
                  },
                },
              }
            : false,
      },
    });
    res.json(author);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function updateAuthor(req: Request, res: Response) {
  try {
    const author = await prisma.author.update({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.json(author);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function destroyAuthor(req: Request, res: Response) {
  try {
    const author = await prisma.author.delete({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
    });
    res.json(author);
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
