const profileSchema = require("../validators/profileValidator");

const createProfile = (req,res) => {
    try {
        const profile = profileSchema.parse(req.body);

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