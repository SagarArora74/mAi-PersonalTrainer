const Profile = require("../models/Profile");
const DietPlan = require("../models/DietPlan");
const WorkoutPlan = require("../models/WorkoutPlan");

const {
    calculateBMR,
    calculateTDEE,
    calculateCalorieGoal,
    calculateProteinGoal
} = require("../services/fitnessCalculator");

const {
    generateAIPlan
} = require("../services/aiService");

const generatePlan = async (req,res) => {
    try {
        const profile= await Profile.findOne({
            user:req.user.userId
        });

        if(!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        const existingWorkoutPlan = await WorkoutPlan.findOne({
            user: req.user.userId
        });

        const existingDietPlan = await DietPlan.findOne({
            user:req.user.userId
        });
        
        const regenerate = req.query.regenerate === "true";

        const plansAreCurrent = 
        !regenerate &&
        existingWorkoutPlan &&
        existingDietPlan &&
        existingWorkoutPlan.profileUpdatedAt?.getTime() === profile.updatedAt?.getTime() &&
        existingDietPlan.profileUpdatedAt?.getTime() === profile.updatedAt?.getTime();

        if (plansAreCurrent) {
            return res.status(200).json({
                message: "AI plans already exist",
                workoutPlan: existingWorkoutPlan,
                dietPlan:existingDietPlan
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

        const nutrition = {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            calorieGoal: Math.round(calorieGoal),
            proteinGoal: Math.round(proteinGoal)
        };

        const aiPlan = await generateAIPlan(
            profile,
            nutrition
        );

        const parsedPlan = JSON.parse(aiPlan);

        const dietData = parsedPlan.dietPlan;

        const workoutData = parsedPlan.workoutPlan;

        let workoutPlan ;

        if(existingWorkoutPlan) {
            existingWorkoutPlan.goal = profile.goal;
            existingWorkoutPlan.experience = profile.experience;
            existingWorkoutPlan.daysPerWeek = profile.daysPerWeek;
            existingWorkoutPlan.profileUpdatedAt = profile.updatedAt;
            existingWorkoutPlan.plan = workoutData.schedule;
            existingWorkoutPlan.splitName = workoutData.splitName;
            existingWorkoutPlan.description = workoutData.description;
            existingWorkoutPlan.guidelines = parsedPlan.trainerGuidelines;

            workoutPlan = await existingWorkoutPlan.save();

        } else {
            workoutPlan = await WorkoutPlan.create({

                user: req.user.userId,
                goal: profile.goal,
                experience: profile.experience,
                daysPerWeek: profile.daysPerWeek,
                profileUpdatedAt:profile.updatedAt,
                plan: workoutData.schedule,
                guidelines: parsedPlan.trainerGuidelines,
                splitName: workoutData.splitName,
                description: workoutData.description

            });
        }
        let dietPlan;

        if(existingDietPlan) {
            existingDietPlan.bmr = nutrition.bmr;
            existingDietPlan.tdee = nutrition.tdee;
            existingDietPlan.proteinGoal = nutrition.proteinGoal;
            existingDietPlan.calorieGoal = nutrition.calorieGoal;
            existingDietPlan.profileUpdatedAt = profile.updatedAt;
            existingDietPlan.dietType = dietData.dietType;
            existingDietPlan.dailyTotals = dietData.dailyTotals;
            existingDietPlan.meals = dietData.meals;

            dietPlan = await existingDietPlan.save();

        } else {
            dietPlan = await DietPlan.create({

                user: req.user.userId,

                bmr: nutrition.bmr,
                tdee: nutrition.tdee,

                proteinGoal: nutrition.proteinGoal,
                calorieGoal: nutrition.calorieGoal,
                profileUpdatedAt: profile.updatedAt,

                dietType: dietData.dietType,

                dailyTotals: dietData.dailyTotals,
                meals: dietData.meals

            });
        }

        console.log("AI plan generated successfully");

        res.status(200).json({

            message: "AI plan generated successfully",
            workoutPlan,
            dietPlan

        });

    } catch (error) {

        console.error("AI plan generation error:",error);

        res.status(500).json({
            message: "Failed to generate AI plan"
        });
    }
};

const getPlanStatus = async (req,res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.userId
        });

        if(!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }
        const workoutPlan = await WorkoutPlan.findOne({
            user: req.user.userId
        });

        const dietPlan = await WorkoutPlan.findOne({
            user:req.user.userId
        });

        if(!workoutPlan || !dietPlan) {
            return res.status(200).json({
                hasPlans: false,
                isOutdated: false
            });
        }

        const isOutdated = 
            workoutPlan.profileUpdatedAt?.getTime() !== profile.updatedAt?.getTime() ||
            dietPlan.profileUpdatedAt?.getTime() !== profile.updatedAt?.getTime();

        res.status(200).json({
            hasPlans: true,
            isOutdated
        });
    } catch (error) {
        console.error("Plan status error: ", error);

        res.status(500).json({
            message: "Failed to check plan status"
        });
    }
};

module.exports = {
    generatePlan,
    getPlanStatus
};