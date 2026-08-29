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

        const existingWorkoutPlan = await WorkoutPlan.findOne({
            user: req.user.userId
        });

        const existingDietPlan = await DietPlan.findOne({
            user: req.user.userId
        });

        let workoutPlan ;

        if(existingWorkoutPlan) {
            existingWorkoutPlan.goal = profile.goal;
            existingWorkoutPlan.experience = profile.experience;
            existingWorkoutPlan.daysPerWeek = profile.daysPerWeek;
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

module.exports = {
    generatePlan
};