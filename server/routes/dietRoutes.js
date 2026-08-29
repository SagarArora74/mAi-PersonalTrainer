const express = require('express');
const { getDietPlan } = require('../controllers/dietController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/", authMiddleware, getDietPlan);


module.exports = router;
