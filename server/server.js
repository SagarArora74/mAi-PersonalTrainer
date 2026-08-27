require("dotenv").config();

const express = require("express");
const cors = require("cors");

const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const dietRoutes = require("./routes/dietRoutes");
const connectDB =require("./config/db");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());


app.get("/" , (req,res) => {
    res.send("mAI-PersonalTrainer is running on port 5000");
});

app.get("/api/test",(req,res)=> {
    res.json({
        message:"Hello from express",
        status: "success"
    });
});

app.use("/api/profile",profileRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/workout", workoutRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});