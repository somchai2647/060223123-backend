import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function createReview(req: Request, res: Response) {
  try {
    const reviewInput: Prisma.ReviewCreateInput = {
      User: {
        connect: {
          //@ts-ignore
          username: req.user.username,
        },
      },
      Products: {
        connect: {
          id: req.body.proid,
        },
      },
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    const review = await prisma.review.create({
      data: reviewInput,
    });

    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}

export async function getReviews(req: Request, res: Response) {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Products: {
          select: {
            name: true,
          },
        },
      },
    });

    res.json(reviews);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getReviewProducts(req: Request, res: Response) {
  try {
    const review = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        productsId: String(req.query.productsid),
      },
      include: {
        User: {
          select: {
            username: true,
            fname: true,
            lname: true,
          },
        },
      },
    });
    res.json(review);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function updateReview(req: Request, res: Response) {
  try {
    const review = await prisma.review.update({
      where: {
        id: String(req.params.id),
      },
      data: {
        rating: Number(req.body.rating),
        comment: req.body.comment,
      },
    });
    res.json(review);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function destroyReview(req: Request, res: Response) {
  try {
    const review = await prisma.review.delete({
      where: {
        id: String(req.params.id),
      },
    });
    res.json(review);

  } catch (error) {
    console.error(error)
    res.status(400).json(error);
  }
}
