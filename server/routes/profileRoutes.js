const express = require("express");

const {
    createProfile
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",authMiddleware, createProfile);
module.exports = router;