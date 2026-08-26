const express = require("express");

const {
    createProfile ,
    getProfile
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",authMiddleware, createProfile);

router.get("/", authMiddleware, getProfile);

module.exports = router;