import { createRequire } from "module";
import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./lib/logger";

// pino-http é CJS puro (module.exports = fn). createRequire garante import
// correto independente de moduleResolution/esModuleInterop do TypeScript.
const require = createRequire(import.meta.url);
const pinoHttp = require("pino-http") as typeof import("pino-http").default;

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
