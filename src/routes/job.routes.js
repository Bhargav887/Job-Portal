import { Router } from "express";
import { createJob, getJob } from "../controllers/job.controller.js";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";

const router = Router();

router.route("/jobs").post(auth, role("recruiter"), createJob).get(getJob);

export default router;
