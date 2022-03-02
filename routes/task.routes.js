const router = require("express").Router();
// const mongoose = require('mongoose');

const Goal = require('../models/Goal.model');
const Project = require('../models/Project.model');


router.post('/', (req, res) => {
  
    const {projectId} = req.body;

    console.log(projectId)

    const goalDetails = { 
      title: req.body.title,
      description: req.body.description,
      project: projectId
    };


  Goal.create(goalDetails)
    .then(newGoal => {
      return Project.findByIdAndUpdate(projectId, { $push: { goals: newGoal._id } } );
    })
    .then(response => res.json(response))
    .catch( err => {
        console.log("error creating a new goal", err);
        res.status(500).json({
          message: "error creating a new goal",
          error: err
        });
      })
  });

module.exports = router;
