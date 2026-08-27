const { generateWorkoutPlan } = require("./services/workoutGenerator");

const profile = {
    goal: "muscle_gain",
    experience: "beginner",
    daysPerWeek: 4
};

const workoutPlan = generateWorkoutPlan(profile);

console.log(
    JSON.stringify(workoutPlan, null, 2)
);