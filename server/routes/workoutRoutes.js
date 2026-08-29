const express = require("express");
const router = express.Router();

const {
    getWorkoutPlan
} = require("../controllers/workoutController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/",authMiddleware, getWorkoutPlan);

module.exports = router;