import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../docs/swagger.config";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { jsonApiResponseMiddleware } from "./middlewares/json-api-response.middleware.js";
import { v1Router } from "./routes/v1/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(jsonApiResponseMiddleware);

app.use("/api/v1", v1Router);

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.listen(8000, () => {
  console.log("✅ Server is running on port 8000");
});