const express = require('express');
const { createDietPlan, getDietPlan } = require('../controllers/dietController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, createDietPlan);

router.get("/", authMiddleware, getDietPlan);


module.exports = router;
