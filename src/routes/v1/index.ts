import { Router } from "express";
import { EventRoute } from "./event.routes.js";

const router = Router();

router.use("/events", EventRoute);

export { router as v1Router };

