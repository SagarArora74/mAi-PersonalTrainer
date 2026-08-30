const express = require("express");

const {
    generatePlan,
    getPlanStatus
} = require("../controllers/aiPlanController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, generatePlan);
router.get("/status",authMiddleware,getPlanStatus);

module.exports = router;