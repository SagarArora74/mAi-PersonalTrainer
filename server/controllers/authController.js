const bcrypt = require("bcrypt");

const User = require("../models/user");
const registerSchema = require("../validators/registerValidator");
const loginSchema = require("../validators/loginValidator");

const registerUser = async (req,res) => {
    try {
        const userData = registerSchema.parse(req.body);

        const existingUser = await User.findOne({
            email: userData.email
        });
        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(
            userData.password,
            10
        );

        const user = await User.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                message: "Invalid registration data",
                errors: error.issues
            });
        }

        console.error("Registration error: ", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const loginUser = async (req,res) => {
    try {
        // validate incoming data by loginSchema
        const loginData = loginSchema.parse(req.body);

        // Find the user by email
        const user = await User.findOne({
            email: loginData.email
        });

        if(!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        // compare entered password with stored hash

        const passwordMatch = await bcrypt.compare(
            loginData.password,
            user.password
        );

        if(!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // login successfull

        res.status(200).json({
            message:"Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                message: "Invalid login data",
                errors: error.issues
            });
        }

        console.error("Login error:" ,error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};