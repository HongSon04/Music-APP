import { Router } from "express";
const router: Router = Router();
import * as songController from "../../controllers/client/song.controller";

router.get("/:slug", songController.index);
router.get("/detail/:slug", songController.detail);

router.patch('/like/:type/:id', songController.like);
router.patch('/favorite/:typeFavorite/:id', songController.favorite);

export const songRouter: Router = router;
