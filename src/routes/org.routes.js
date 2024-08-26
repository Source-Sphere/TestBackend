import { Router } from "express";
import { registerOrg, getAllOrg } from "../controllers/org.controller.js";

const router = Router();

router.route("/regOrg").post(registerOrg);
router.route("/allOrg").get(getAllOrg);

export default router;
