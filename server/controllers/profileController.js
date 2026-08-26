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

const getProfile = async (req,res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.userId
        });
        
        if(!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            profile
        });
    } catch (error) {
        console.error("Get profile error: ",error);

        res.status(500).json({
            message: "Failed to fetch profile"
        });
    }
};

const updateProfile = async (req,res) => {
    try {
        const profile = profileSchema.parse(req.body);

        const updatedProfile = await Profile.findOneAndUpdate(
            {
                user:req.user.userId
            },
            {
                ...profile
            },
            {
                new: true,
                runValidators: true
            }
        );

        if(!updatedProfile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }
        res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile
        });
    } catch (error) {
        console.error("Update profile error: ", error);

        res.status(400).json({
            message: "Profile update failed",
            errors: error.message
        });
    }
};

module.exports = {
    createProfile,
    getProfile,
    updateProfile
};