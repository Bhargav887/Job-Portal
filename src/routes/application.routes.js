import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";
import upload from "../config/multer.js";
import {
  applyJob,
  myApplication,
  jobApplications,
} from "../controllers/application.controller.js";

const router = Router();
router.post(
  "/:jobId",
  auth,
  role("job-seeker"),
  upload.single("resume"),
  applyJob
);

router.get("/my", auth, role("job-seeker"), myApplication);

router.get("/job/:id", auth, role("recruiter"), jobApplications);

export default router;
