const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    age: {
        type: Number,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    goal: {
        type: String,
        enum: [
            "weight_loss",
            "muscle_gain",
            "maintenance"
        ],
        required: true
    },

    daily_physical_activity: {
        type: String,
        enum: [
            "lowly_active",
            "moderately_active",
            "highly_active"
        ],
        required: true
    },

    experience: {
        type: String,
        enum: [
            "beginner",
            "intermediate",
            "advanced"
        ],
        required: true
    },

    diet:{
        type: String,
        enum: [
            "vegetarian",
            "non_vegetarian",
            "eggitarian",
            "vegan"
        ],
        required: true
    },

    daysPerWeek: {
        type: Number,
        required: true,
        min: 1,
        max: 7
    }
},
{
    timestamps: true
}
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;