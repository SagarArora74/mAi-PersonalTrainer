const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            unique:true
        },

        bmr: {
            type: Number,
            required: true
        },

        tdee: {
            type: Number,
            required: true
        },
        
        proteinGoal: {
            type: Number,
            required: true,
            unique: true
        },

        calorieGoal: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "DietPlan",
    dietPlanSchema
);