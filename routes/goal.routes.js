const router = require("express").Router();
// const mongoose = require('mongoose');
const mongoose = require("mongoose");
const Goal = require("../models/Goal.model");
const Project = require("../models/Project.model");




router.post("/", (req, res) => {
  
  

  const goalDetails = {
    title: req.body.title,
    description: req.body.description,
    projectId: req.body.projectId,
  };

  Goal.create(goalDetails)
    .then((newGoal) => {
      console.log(newGoal);
      return Project.findByIdAndUpdate(goalDetails.projectId, {
        $push: { goals: newGoal._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error creating a new goal", err);
      res.status(500).json({
        message: "error creating a new goal",
        error: err,
      });
    });
});


<<<<<<< HEAD

=======
router.get("/", (req, res, next ) => {
  Goal.find()
  .then((allGoals) => res.json(allGoals))
  .catch((err) => res.json(err))
});

router.get("/:goalId", (req, res, next) => {
  const {goalId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Goal.findById(goalId)
  .then((goal) => res.json(goal))
  .catch((err) => res.status(500).json(err));
})


router.put("/:goalId/update", (req, res, next) => {
  const { goalId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(goalId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const goalDetails = {
    title: req.body.title,
    description: req.body.description
  };

  Goal.findByIdAndUpdate(goalId, goalDetails, { new: true })
  .then((updatedGoal) => res.json(updatedGoal))
  .catch((error) => res.json(error));
});
>>>>>>> deb3d625e5bf04b5a7881191fd6712b209c6b0bd


module.exports = router;
