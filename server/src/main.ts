import express, { Application } from "express";
import cors from "cors";
import { z } from "zod";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";

require("dotenv").config();

const app: Application = express();
app.use(express.json());
app.use(cors({}));

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

// test state
let counter: number = 0;
const counterIncrement = (num: number = 1) => {
  return (counter += num);
};
const counterReset = () => {
  counter = 0;
  return counter;
};

// test router
const apiRouter = trpc //https://trpc.io/docs/v9/
  .router()
  .query("counter", {
    input: z.undefined(),
    async resolve() {
      return counter;
    },
  })
  .mutation("counterIncrement", {
    input: z.optional(z.number().int().nonnegative()),
    async resolve(req) {
      return counterIncrement(req.input);
    },
  })
  .mutation("counterReset", {
    input: z.undefined(),
    async resolve(req) {
      return counterReset();
    },
  });

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: apiRouter,
    createContext,
  })
);

const API_PORT = process.env.API_PORT;
app.listen(API_PORT, () => {
  console.log("Server listening on :" + API_PORT);
});

export type ApiRouter = typeof apiRouter;
