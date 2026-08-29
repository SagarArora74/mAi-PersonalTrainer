const Profile = require("../models/Profile");
const WorkoutPlan = require("../models/WorkoutPlan");

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
    getWorkoutPlan
};