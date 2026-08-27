const express = require("express");
const router = express.Router();

const {
    createWorkoutPlan,
    getWorkoutPlan
} = require("../controllers/workoutController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createWorkoutPlan);
router.get("/",authMiddleware, getWorkoutPlan);

module.exports = router;