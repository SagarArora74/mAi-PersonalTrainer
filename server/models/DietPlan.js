const mongoose = require("mongoose");


const mealSchema = new mongoose.Schema(
    {
        mealName: {
            type:String,
            required: true
        },

        calories: {
            type: Number,
            required: true,
            min: 0
        },

        proteinG: {
            type: Number,
            required: true,
            min: 0
        },

        items: {
            type: [String],
            required: true
        }
    },
    {
        _id: false
    }
);

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
            required: true
        },

        calorieGoal: {
            type: Number,
            required: true,
            min: 0
        },
        
        dietType: {
            type: String
        },

        dailyTotals: {
            calories: {
                type: Number,
                min:0
            },

            proteinG: {
                type: Number,
                min: 0
            }
        },

        meals: {
            type: [mealSchema],
            default: []
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