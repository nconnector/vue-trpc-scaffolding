import express, { Application } from "express";
import cors from "cors";
import { z } from "zod";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";

const app: Application = express();
app.use(express.json());
app.use(cors({}));

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

//
let counter = 0;
const incrementCounter = (val: number) => {
  counter += val;
  return counter;
};
//

const apiRouter = trpc
  .router()
  .query("health-check", {
    input: z.undefined(),
    async resolve(req) {
      return "200 ALL GOOD!";
    },
  })
  .mutation("increment-counter", {
    input: z.union([z.object({ incrementBy: z.number() }), z.undefined()]),
    async resolve(req) {
      const incrementBy = req.input?.incrementBy || 1;
      return incrementCounter(incrementBy);
    },
  });

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: apiRouter,
    createContext,
  })
);

app.listen(5001, () => {
  console.log("Server listening on :5001");
});
