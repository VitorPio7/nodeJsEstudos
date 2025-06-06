/**responável pelo roteamento */
import { Router } from "express";
import { listAction } from "./controller";

const router = Router();

router.get("/", listAction);

export { router };
