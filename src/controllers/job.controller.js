import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const job = new Job({ title, company, location, description });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res
      .status(400)
      .json({ message: " failed to create job", error: error.message });
  }
};

export const getJob = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name");
    res.json(jobs);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
