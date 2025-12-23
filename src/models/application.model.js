import mongoose from "mongoose";

const ApplicationSchema = mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "reviewing", "rejected", "accepted"],
    default: "applied",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
