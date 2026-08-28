require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

console.log("Gemini service loaded:", !!process.env.GEMINI_API_KEY);

const testGemini = async() => {
    const response = await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents: "Say hello from Gemini.",
        config: {
            responseMimeType: "application/json"
        }
    });
    return response.text;
};

const generateAIPlan = async (profile, nutrition) => {
    const prompt = `
You are an AI personal fitness trainer.

Create a personalized fitness plan using the user's profile and calculated nutrition targets.

USER PROFILE:
Age: ${profile.age}
Gender: ${profile.gender}
Height: ${profile.height} cm
Weight: ${profile.weight} kg
Goal: ${profile.goal}
Activity Level: ${profile.daily_physical_activity}
Experience Level: ${profile.experience}
Dietary Preference: ${profile.diet}
Workout Days Per Week: ${profile.daysPerWeek}

NUTRITION TARGETS:
BMR: ${nutrition.bmr} kcal
TDEE: ${nutrition.tdee} kcal
Daily Calorie Goal: ${nutrition.calorieGoal} kcal
Daily Protein Goal: ${nutrition.proteinGoal} g

IMPORTANT REQUIREMENTS:

1. Create exactly ${profile.daysPerWeek} workout days.
2. The remaining days of the week must be complete rest days. Do not include exercises, cardio, walking, stretching, or active recovery activities on rest days.
3. Use the user's goal, experience level, and activity level when designing the workout.
4. Make the exercises appropriate for the user's experience level.
5. For each exercise, provide:
   - name
   - sets
   - reps
   - restPeriod
6. For cardio/recovery activities, use duration and intensity where appropriate.
7. Create a daily diet plan matching the user's dietary preference.
8. Try to keep the daily calories close to ${nutrition.calorieGoal} kcal.
9. Try to keep daily protein close to ${nutrition.proteinGoal} g.
10. Do not recommend foods that conflict with the user's dietary preference.

RETURN ONLY VALID JSON.

Use exactly this structure:

{
    "workoutPlan": {
        "splitName": "string",
        "description": "string",
        "schedule": [
            {
                "day": "Day 1",
                "focus": "string",
                "exercises": [
                    {
                        "name": "string",
                        "sets": 3,
                        "reps": "10-12",
                        "restPeriod": "60-90 seconds",
                        "duration": "optional",
                        "intensity": "optional"
                    }
                ],
                "notes": "optional"
            }
        ]
    },

    "dietPlan": {
        "dietType": "string",
        "dailyTotals": {
            "calories": 2234,
            "proteinG": 128
        },
        "meals": [
            {
                "mealName": "Breakfast",
                "calories": 500,
                "proteinG": 30,
                "items": [
                    "food item 1",
                    "food item 2"
                ]
            }
        ]
    },

    "trainerGuidelines": [
        "guideline 1",
        "guideline 2"
    ]
}
`;
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType:"application/json"
        }
    }); 
    return response.text;
}


module.exports ={
    testGemini,
    generateAIPlan
};