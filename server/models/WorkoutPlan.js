const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        sets: {
            type: Number
        },

        reps: {
            type: String
        },

        restPeriod: {
            type: String
        },

        duration: {
            type: String
        },

        intensity: {
            type: String
        }
    },
    {
        _id: false
    }
);

const workoutDaySchema = new mongoose.Schema(
    {
        day: {
            type: String,
            required: true
        },

        focus: {
            type: String,
            required: true
        },

        exercises: {
            type: [exerciseSchema],
            default: []
        },

        notes: {
            type: String
        }
    },
    {
        _id: false
    }
);

const workoutPlanSchema = new mongoose.Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
            unique:true
        },

        goal: {
            type:String,
            required:true,
            enum: [
                "weight_loss",
                "muscle_gain",
                "maintenance"
            ]
        },
        
        experience: {
            type: String,
            required: true,
            enum: [
                "beginner",
                "intermediate",
                "advanced"
            ]
        },

        daysPerWeek: {
            type:Number,
            required: true,
            min: 1,
            max: 7
        },

        plan: {
            type: [workoutDaySchema],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "WorkoutPlan",
    workoutPlanSchema
);