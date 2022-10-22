import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPublisher(req: Request, res: Response) {
  try {
    const publisherInput: Prisma.PublisherCreateInput = {
      name: req.body.name,
      address: req.body.address,
      tel: req.body.tel,
    };
    const publisher = await prisma.publisher.create({
      data: publisherInput,
    });
    res.json(publisher);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}

export async function getPublishers(req: Request, res: Response) {
  try {
    const withproduct = req.query.withproduct;

    const publisher = await prisma.publisher.findMany({
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
    res.json(publisher);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getPublisher(req: Request, res: Response) {
  try {
    const withproduct = req.query.withproduct;
    const publisher = await prisma.publisher.findUnique({
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
    res.json(publisher);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function updatePublisher(req: Request, res: Response) {
  try {
    const publisher = await prisma.publisher.update({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
      data: {
        name: req.body.name,
        address: req.body.address,
        tel: req.body.tel,
      },
    });
    res.json(publisher);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function destroyPublisher(req: Request, res: Response) {
  try {
    const publisher = await prisma.publisher.delete({
      where: {
        // @ts-ignore
        id: String(req.params.id),
      },
    });
    res.json(publisher);
  } catch (error) {
    res.status(400).json(error);
  }
}

// export async function deletePublisher(req: Request, res: Response) {
//     try {
//       const publisher = await prisma.publishers.update({
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
