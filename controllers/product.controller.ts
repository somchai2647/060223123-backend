import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProduct(req: Request, res: Response) {
  try {
    const cover = { url: req.body.cover, type: "COVER" };
    const images = req.body.imagebook.map(
      (pic: Prisma.ImageBookCreateInput) => {
        return { url: pic.url, type: "OTHER" };
      }
    );
    const productInput: Prisma.ProductsCreateInput = {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      cost: req.body.cost,
      amountpage: Number(req.body.amountpage),
      stock: Number(req.body.stock),
      stockAlm: Number(req.body.stockAlm),
      discount: Number(req.body.discount),
      isRecommend: req.body.isRecommend,
      category: {
        connect: {
          id: req.body.category,
        },
      },
      author: {
        connect: {
          id: req.body.author,
        },
      },
      publisher: {
        connect: {
          id: req.body.publisher,
        },
      },
      image: {
        createMany: {
          data: [cover, ...images],
        },
      },
    };
    const product = await prisma.products.create({
      data: productInput,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
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
        image: {
          orderBy: {
            type: "asc",
          },
          select: {
            id: true,
            url: true,
            type: true,
          },
        },
      },
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const orderby = req.query.orderby;
    const allBooks = await prisma.products.findMany({
      orderBy: {
        createdAt: orderby === "desc" ? "desc" : "asc",
      },
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
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
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
        image: {
          orderBy: {
            type: "asc",
          },
          select: {
            url: true,
            type: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
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

export async function searchProduct(req: Request, res: Response) {
  try {
    const keyword = req.query.keyword || " ";
    const isRecommend = req.query.isRecommend;
    const products = await prisma.products.findMany({
      take: keyword ? undefined : 10,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        isDelete: false,
        isRecommend: isRecommend ? true : undefined,
        OR: [
          {
            name: {
              contains: String(keyword),
            },
          },
          {
            author: {
              name: {
                contains: String(keyword),
              },
            },
          },
          {
            category: {
              name: {
                contains: String(keyword),
              },
            },
          },
        ],
      },
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
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getProdctGroup(req: Request, res: Response) {
  try {
    const { name, isrecommend, createdat, take } = req.query;
    const products = await prisma.products.findMany({
      take: Number(take || 5),
      where: {
        isDelete: false,
        OR: [
          {
            isRecommend: isrecommend === "true",
          },
          {
            name: {
              startsWith: name as string,
            },
          },
        ],
      },
      orderBy: {
        createdAt: createdat as "asc" | "desc",
      },
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
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
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
    res.json(products);
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
        desc: req.body.desc,
        isRecommend: req.body.isRecommend,
        category: {
          connect: {
            id: req.body.category,
          },
        },
        author: {
          connect: {
            id: req.body.author,
          },
        },
        publisher: {
          connect: {
            id: req.body.publisher,
          },
        },
        stock: req.body.stock,
        stockAlm: req.body.stockAlm,
        cost: req.body.cost,
        discount: req.body.discount,
      },
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
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
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
    const coverNew = {
      url: req.body.cover,
      type: "COVER",
      productsId: product.id,
    };
    const imagesNew = req.body.imagebook.map(
      (pic: Prisma.ImageBookCreateInput) => {
        return { url: pic.url, type: "OTHER", productsId: product.id };
      }
    );
    await prisma.imageBook.deleteMany({
      where: {
        // @ts-ignore
        productsId: String(product.id),
      },
    });
    const images = await prisma.imageBook.createMany({
      data: [coverNew, ...imagesNew],
      // @ts-ignore
      skipDuplicates: true,
    });
    product.image = [coverNew, ...imagesNew];

    res.json(product);
  } catch (error) {
    res.status(400).json(error);
    console.error(error);
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
    await prisma.imageBook.deleteMany({
      where: {
        productsId: product.id,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
}
