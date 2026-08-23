const {z} = require ("zod");

const profileSchema = z.object({
    age: z.number().min(13).max(100),
    height: z.number().positive(),
    weight: z.number().positive(),

    goal: z.enum([
        "weight_loss",
        "muscle_gain",
        "maintenance"
    ]),

    daily_physical_activity: z.enum([
        "lowly_active",
        "moderately_active",
        "highly_active"
    ]),
    experience: z.enum([
        "beginner",
        "intermediate",
        "advanced"
    ]),

    diet: z.enum([
        "vegetarian",
        "non_vegetarian",
        "eggitarian",
        "vegan"
    ]),

    daysPerWeek: z.number().min(1).max(7)
});

module.exports = profileSchema;