const { generateAIPlan } = require("./services/aiService");

const profile = {
    age: 23,
    gender: "male",
    height: 172,
    weight: 71,
    goal: "weight_loss",
    daily_physical_activity: "moderately_active",
    experience: "beginner",
    diet: "non_vegetarian",
    daysPerWeek: 4
};

const nutrition = {
    bmr: 1764,
    tdee: 2734,
    calorieGoal: 2234,
    proteinGoal: 128
};

const runTest = async () => {
    try {
        const response = await generateAIPlan(profile, nutrition);

        console.log("Gemini AI Plan:");
        console.log(response);
    } catch (error) {
        console.error("Gemini error:", error);
    }
};

runTest();