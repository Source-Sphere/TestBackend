import { Router } from "express";
import { registerOrg } from "../controllers/org.controller";

const router = Router();

router.route("/regOrg").post(registerOrg);

export default router;
