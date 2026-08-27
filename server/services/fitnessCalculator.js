const calculateBMR = (profile) => {
    const { age,gender,height,weight } = profile;

    if(gender == "male"){
        return (10 * weight) + (6.25 * height) - (5*age) + 5;
    }

    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
};

const getActivityMultiplier = (activity) => {
    const multipliers = {
        lowly_active: 1.2,
        moderately_active: 1.55,
        highly_active: 1.725
    };
    return multipliers[activity];
};

const calculateTDEE = (bmr, activity) => {
    const multiplier = getActivityMultiplier(activity);

    if(!multiplier) {
        throw new Error("Invalid activity level");
    }
    return bmr * multiplier;
};

const calculateCalorieGoal = (tdee,goal) => {
    if (goal === "weight_loss") {
        return tdee - 500;
    }

    if(goal === "muscle_gain") {
        return tdee+300;
    }
    if (goal === "maintenance") {
        return tdee;
    }
    throw new Error("Invalid fitness goal");
};

const calculateProteinGoal = (weight,goal) => {
    if(goal ==="weight_loss") {
        return weight*1.6;
    }
    if(goal ==="muscle_gain") {
        return weight*1.8;
    }
    if(goal ==="maintenance") {
        return weight*1.4;
    }
    throw new Error("Invalid fitness goal");
};

module.exports = {
    calculateBMR,
    calculateTDEE,
    calculateCalorieGoal,
    calculateProteinGoal
};