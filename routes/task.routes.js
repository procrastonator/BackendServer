const router = require("express").Router();
// const mongoose = require('mongoose');

const Task = require('../models/Task.model');
const Project = require('../models/Project.model');


router.post('/', (req, res) => {
  
    const {projectId} = req.body;

    console.log(projectId)

    const taskDetails = { 
      title: req.body.title,
      description: req.body.description,
      project: projectId
    };


  Task.create(taskDetails)
    .then(newTask => {
      return Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } } );
    })
    .then(response => res.json(response))
    .catch( err => {
        console.log("error creating a new task", err);
        res.status(500).json({
          message: "error creating a new task",
          error: err
        });
      })
  });

module.exports = router;
