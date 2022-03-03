const router = require("express").Router();
const authRoutes = require("./auth.routes");
const projectRoutes = require("./project.routes")
const goalRoutes = require ("./goal.routes")

const { isAuthenticated } = require("../middleware/jwt.middleware"); 

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// /api/auth/somthing
router.use("/auth", authRoutes);
// /api/projects/somthing
router.use("/projects",  projectRoutes);
// here you lock up the route in a safty code. in isAuthenticated, 
router.use("/goals",  goalRoutes);

module.exports = router;
