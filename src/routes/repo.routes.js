import { Router } from "express";
import { createRepo } from "../controllers/repo.controller.js";
import { getRepos } from "../controllers/repo.controller.js";

const router = Router();

router.route("/addRepo").post(createRepo);
router.route("/getRepo").get(getRepos);
export default router;
