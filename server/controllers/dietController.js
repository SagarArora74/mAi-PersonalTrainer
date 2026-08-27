const Profile = require("../models/Profile");
const DietPlan = require("../models/DietPlan");

const {
    calculateBMR,
    calculateTDEE,
    calculateCalorieGoal,
    calculateProteinGoal
} = require("../services/fitnessCalculator");

const createDietPlan = async (req,res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.userId
        });

        if(!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        const bmr = calculateBMR(profile);
        
        const tdee = calculateTDEE(
            bmr,
            profile.daily_physical_activity
        );

        const calorieGoal = calculateCalorieGoal(
            tdee,
            profile.goal
        );

        const proteinGoal = calculateProteinGoal(
            profile.weight,
            profile.goal
        );

        const existingDietPlan = await DietPlan.findOne({
            user: req.user.userId
        });

        if(existingDietPlan) {
            return res.status(409).json({
                message: "Diet plan already exists",
                dietPlan: existingDietPlan
            });
        }

        const dietPlan = await DietPlan.create({
            user: req.user.userId,
            proteinGoal: Math.round(proteinGoal),
            calorieGoal: Math.round(calorieGoal),
            bmr: Math.round(bmr),
            tdee: Math.round(tdee)
        });
        
        res.status(201).json({
            message: "Diet plan created successfully",
            dietPlan: {
                ...dietPlan.toObject(),
                bmr: Math.round(bmr),
                tdee: Math.round(tdee)
            }
        });
    } catch (error) {
        console.error("Diet plan creation error:", error);

        res.status(500).json({
            message: "Failed to create diet plan"
        });
    }
};

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
    createDietPlan,
    getDietPlan
};