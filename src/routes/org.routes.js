import { Router } from "express";
import { registerOrg } from "../controllers/org.controller.js";

const router = Router();

router.route("/regOrg").post(registerOrg);

export default router;
