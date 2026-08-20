const profileSchema = require("../validators/profileValidator");
const Profile = require("../models/Profile");

const createProfile = async (req,res) => {
    try {
        const profile = profileSchema.parse(req.body);
        const savedProfile = await Profile.create(profile);

        res.status(201).json({
            message: "Profile created Successfully",
            profile: profile
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid data",
            errors: error.issues
        });
    }
};

module.exports = {
    createProfile
};