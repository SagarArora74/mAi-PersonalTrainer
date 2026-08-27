const Profile = require("../models/Profile");
const WorkoutPlan = require("../models/WorkoutPlan");

const {
    generateWorkoutPlan
} = require("../services/workoutGenerator");

const {
    generateAIPlan 
} = require("../services/aiService");

const {
    calculateBMR,
    calculateTDEE,
    calculateCalorieGoal,
    calculateProteinGoal
} = require("../services/fitnessCalculator");

const createWorkoutPlan = async (req,res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.userId
        });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }
        const bmr = calculateBMR(profile);

        const tdee = calculateTDEE(
            bmr,
            profile.daily_physical_activity
        );
        const calorieGoal = calculateCalorieGoal(tdee,
            profile.goal
        );

        const proteinGoal = calculateProteinGoal(
            profile.weight,
            profile.goal
        );

        const nutrition = {
            bmr:Math.round(bmr),
            tdee:Math.round(tdee),
            calorieGoal:Math.round(calorieGoal),
            proteinGoa: Math.round(proteinGoal)
        };
        const aiPlan = await generateAIPlan(profile,nutrition);
        const parsedPlan = JSON.parse(aiPlan);

        const existingWorkoutPlan = await WorkoutPlan.findOne({
            user: req.user.userId
        });

        if (existingWorkoutPlan) {
            return res.status(400).json({
                message: "Workout plan already exists",
                workoutPlan: existingWorkoutPlan
            });
        }

        //const plan = generateWorkoutPlan(profile);

        const workoutPlan = await WorkoutPlan.create({
            user: req.user.userId,
            goal: profile.goal,
            experience: profile.experience,
            daysPerWeek: profile.daysPerWeek,
            plan: parsedPlan.workoutPlan.schedule
        });

        res.status(201).json({
            message: "Workout plan created successfully",
            workoutPlan
        });
    } catch (error) {
        console.error("Workout plan creation error: ", error);

        res.status(500).json({
            message: "Failed to create workout plan"
        });
    }
};

const getWorkoutPlan = async(req,res) => {
    try {
        const workoutPlan = await WorkoutPlan.findOne({
            user: req.user.userId
        });

        if(!workoutPlan) {
            return res.status(404).json({
                message: "Workout plan not found"
            });
        }

        res.status(200).json({
            message:"Workout plan fetched successfully",
            workoutPlan
        });
    } catch (error) {
        console.error("Workout plan fetched error: ", error);

        res.status(500).json({
            message: "Failed to fetch workout plan"
        });
    }
};

module.exports = {
    createWorkoutPlan,
    getWorkoutPlan
};