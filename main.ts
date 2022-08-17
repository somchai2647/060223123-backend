import express, { Request, Response, Express } from "express";

import cors from "cors";

import router from './routes'

require("dotenv").config();
const app: Express = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} ${process.env.DATABASE_URL}`);
});
