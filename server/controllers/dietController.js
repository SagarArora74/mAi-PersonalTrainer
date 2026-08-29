const Profile = require("../models/Profile");
const DietPlan = require("../models/DietPlan");

const getDietPlan = async (req,res) => {
    try {
        const dietPlan = await DietPlan.findOne({
            user:req.user.userId
        });

        if(!dietPlan) {
            return res.status(404).json({
                message:"Diet plan not found"
            });
        }

        res.status(200).json({
            message: "Diet plan fetched successfully",
            dietPlan
        });
    } catch (error) {
        console.error("Diet plan fetch error: ", error);

        res.status(500).json({
            message: "Failed to fetch diet plan"
        });
    }
};

module.exports = {
    getDietPlan
};