import Application from "../models/application.model.js";

export const applyJob = async (req, res) => {
  const job = req.params.jobId;
  const applicant = req.user.id;
  const resume = req.file.path;

  const application = new Application({
    job,
    applicant,
    resume,
  });
  const savedApplied = await application.save();

  res.json(savedApplied);
};

export const myApplication = async (req, res) => {
  const applicantID = req.user.id;
  const myApp = await Application.find(
    { applicant: applicantID }.populate("job")
  );
  res.json(myApp);
};

export const jobApplications = async (req, res) => {
  const jobId = req.params.id;
  const applications = await Application.find({ job: jobId }).populate(
    "applicant",
    "name email"
  );

  res.json(applications);
};
