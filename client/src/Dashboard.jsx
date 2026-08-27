import { useEffect , useState } from "react";
import { useAuth } from "./AuthContext";

function Dashboard () {
    const { token } = useAuth();

    const[profile, setProfile] = useState(null);
    const[dietPlan, setDietPlan] = useState(null);
    const[workoutPlan, setWorkoutPlan] = useState(null);

    const[loading,setLoading] = useState(true);
    const[message,setMessage] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const profileResponse = await fetch(
                    "http://localhost:5000/api/profile",
                    {
                        method:"GET",
                        headers: {
                            "Authorization":`Bearer ${token}`
                        }
                    }
                );

                const profileData = await profileResponse.json();

                if(profileResponse.ok) {
                   setProfile(profileData.profile);
                } else {
                    setMessage(profileData.message || "Could not fetch profile");
                    return;
                }
                const dietResponse = await fetch(
                    "http://localhost:5000/api/diet",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                const dietData = await dietResponse.json();

                if(dietResponse.ok) {
                    setDietPlan(dietData.dietPlan);
                } else {
                    setMessage(
                        dietData.message || "Could not fetch diet plan"
                    );
                }

                const workoutResponse = await fetch(
                    "http://localhost:5000/api/workout",
                    {
                        method: "GET",
                        headers: {
                            "Authorization":`Bearer ${token}`
                        }
                    }
                );
                const workoutData = await workoutResponse.json();
                if(workoutResponse.ok) {
                    setWorkoutPlan(workoutData.workoutPlan);
                } else {
                    setMessage(
                        workoutData.message || "Could not fetch workout plan"
                    );
                }

            } catch (error) {
                console.error("Dashboard error:",error);
                setMessage("Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    },[token]);

    if(loading) {
        return <p>Loading Dashboard...</p>;
    }
    if(!profile) {
        return <p>{message || "Profile not found"}</p>;
    }

    return (
        <div>
            <h1> AI Personal Trainer </h1>
            <h2>Dashboard</h2>
            <h3>Your Profile</h3>

            <p>Age: {profile.age}</p>
            <p>Gender: {profile.gender}</p>
            <p>Height: {profile.height} cm</p>
            <p>Weight: {profile.weight} kg</p>
            <p>Goal: {profile.goal}</p>
            <p>
                Activity: {profile.daily_physical_activity}
            </p>
            <p>Experience: {profile.experience}</p>
            <p>Diet: {profile.diet}</p>
            <p>Days per week: {profile.daysPerWeek}</p>

            {dietPlan && (
                <div>
                    <h3>Daily Nutrition</h3>

                    <p>
                        Calorie Goal: {dietPlan.calorieGoal} kcal/day
                    </p>

                    <p>
                        Protein Goal: {dietPlan.proteinGoal} g/day
                    </p>

                    <p>
                        BMR: {dietPlan.bmr} kcal
                    </p>

                    <p>
                        TDEE: {dietPlan.tdee} kcal
                    </p>
                </div>
            )}
            {workoutPlan && (
                <div>
                    <h3>Your Workout Plan</h3>

                    {workoutPlan.plan.map((day) => (
                        <div key ={day.day}>
                            <h4>{day.title}</h4>

                            {day.exercises.map((exercise,index) => (
                                <p key = {index}>
                                    {exercise.name} - {exercise.sets}  * {exercise.reps}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;