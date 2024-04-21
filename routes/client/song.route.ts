import { Router } from "express";
const router: Router = Router();
import * as songController from "../../controllers/client/song.controller";
import Topic from "../../models/topic.model";

router.get("/:slug", songController.index);

export const songRouter: Router = router;
