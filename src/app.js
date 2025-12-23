import express from "express";
import cors from "cors";

import jobRoutes from "./routes/job.routes.js";
import authRoutes from "./routes/auth.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

export default app;
