const { z } = require ("zod");

const registerSchema = z.object({
    name: z
        .string()
        .min(2,"Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),

    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(8,"Password must be at least 8 characters")

});

module.exports = registerSchema;