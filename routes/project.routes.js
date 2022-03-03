const router = require("express").Router();
const Project = require("../models/Project.model");
const mongoose = require("mongoose");
const Goal = require("../models/Goal.model");

router.post("/", (req, res) => {
  // console.log(req.body)

  const projectDetails = {
    title: req.body.title,
    description: req.body.description,
    goals: [],
  };
  Project.create(projectDetails)
    .then((projectCreated) => {
      res.json(projectCreated);
    })
    .catch((err) => {
      console.log("error creating a new project", err);
      res.status(500).json({
        message: "error creating a new project",
        error: err,
      });
    });
});

router.get("/", (req, res, next) => {
  Project.find()
    .populate("goals")
    .then((allProjects) => res.json(allProjects))
    .catch((err) => res.json(err));
});

router.get("/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findById(projectId)
    .populate("goals")
    .then((project) => res.json(project))
    .catch((err) => res.status(500).json(err));
});

router.put("/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  const projectDetails = {
    title: req.body.title,
    description: req.body.description,
    goals: req.body.goals,
  };

  Project.findByIdAndUpdate(projectId, projectDetails, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch((error) => res.json(error));
});

router.delete("/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(projectId)
    .then((deteletedProject) => {
      return Goal.deleteMany({ _id: { $in: deteletedProject.goals } });
    })
    .then(() =>
      res.json({
        message: `Project with ${projectId} is removed successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
