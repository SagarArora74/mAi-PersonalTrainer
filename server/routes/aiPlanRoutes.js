const express = require("express");

const {
    generatePlan
} = require("../controllers/aiPlanController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, generatePlan);

module.exports = router;