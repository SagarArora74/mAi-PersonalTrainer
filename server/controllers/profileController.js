const profileSchema = require("../validators/profileValidator");
const Profile = require("../models/Profile");

const createProfile = async (req,res) => {
    try {
        const profile = profileSchema.parse(req.body);


        const savedProfile = await Profile.create({
            ...profile,
            user: req.user.userId
        });

        res.status(201).json({
            message: "Profile created Successfully",
            profile: savedProfile
        });
    } catch (error) {
        console.error("Profile creation error: ", error);
        res.status(400).json({
            message: "Profile creation failed",
            errors: error.message
        });
    }
};

module.exports = {
    createProfile
};