const exerciseLibrary = {
    chest: [
        "Push-ups",
        "Bench Press",
        "Dumbbell Chest Press"
    ],

    back: [
        "Lat Pulldown",
        "Seated Row",
        "Dumbbell Row"
    ],

    legs: [
        "Squats",
        "Lunges",
        "Leg Press"
    ],

    shoulders: [
        "Shoulder Press",
        "Lateral Raises",
        "Front Raises"
    ],

    biceps: [
        "Bicep Curls",
        "Hammer Curls"
    ],

    triceps: [
        "Tricep Dips",
        "Tricep Pushdown"
    ],

    core: [
        "Plank",
        "Crunches",
        "Leg Raises"
    ]
};

const createExercises = (muscleGroups,experience) => {
    let sets = 3;
    let reps = 12;

    if(experience==="beginner") {
        sets = 3;
        reps = 12;
    }

    if(experience === "intermediate") {
        sets = 3;
        reps = 10;
    }

    if(experience === "advanced") {
        sets = 4;
        reps = 10;
    }
    
    const exercises = [];

    muscleGroups.forEach((muscle) => {
        const availableExercises = exerciseLibrary[muscle];

        if(!availableExercises) {
            return;
        }
        const selectedExercise = availableExercises[0];

        exercises.push({
            name: selectedExercise,
            sets,
            reps
        });
    });
    return exercises;
};

const generateWorkoutPlan = (profile) => {
    const { goal, experience, daysPerWeek } = profile;

    let split = [];

    if (daysPerWeek === 3) {
        split = [
            ["legs","chest","core"],
            ["back","biceps"],
            ["legs","chest","back"]
        ];
    }

    if (daysPerWeek === 4) {
        split = [
            ["chest","triceps"],
            ["back","biceps"],
            ["legs","core"],
            ["shoulders","core"]
        ];
    }

    if (daysPerWeek === 5) {
        split = [
            ["chest", "triceps"],
            ["back", "biceps"],
            ["legs"],
            ["shoulders", "core"],
            ["chest", "back"]
        ];
    }

    if (daysPerWeek === 6) {
        split = [
            ["chest", "triceps"],
            ["back", "biceps"],
            ["legs"],
            ["shoulders", "core"],
            ["chest", "triceps"],
            ["back", "biceps"]
        ];
    }

    if (daysPerWeek === 7) {
        split = [
            ["chest", "triceps"],
            ["back", "biceps"],
            ["legs"],
            ["shoulders", "core"],
            ["chest", "triceps"],
            ["back", "biceps"],
            ["legs", "core"]
        ];
    }

    if (daysPerWeek === 1 || daysPerWeek === 2) {
        split = [
            ["legs", "chest", "back", "shoulders","core"]
        ];
    }

    return split.map((muscleGroups,index) => ({
        day: index + 1,
        title: `Day ${index + 1}`,
        exercises: createExercises(
            muscleGroups,
            experience
        )
    }));
};

module.exports = {
    generateWorkoutPlan
};