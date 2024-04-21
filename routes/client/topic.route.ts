import {  Router } from "express";
const router: Router = Router();
import * as topicController from "../../controllers/client/topic.controller";
import Topic from "../../models/topic.model";

router.get("/", topicController.index);

export const topicRouter: Router = router;