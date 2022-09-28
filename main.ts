import express, { Request, Response, Express } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import router from "./routes";

require("dotenv").config();
const app: Express = express();
const port = process.env.PORT || 4001;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.get("/", async (req: Request, res: Response) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} ${process.env.DATABASE_URL}`);
});
