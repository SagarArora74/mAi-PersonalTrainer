import { useEffect , useState } from "react";
import { useAuth } from "./AuthContext";

function Dashboard () {
    const { token } = useAuth();

    const[profile, setProfile] = useState(null);
    const[dietPlan, setDietPlan] = useState(null);
    const[workoutPlan, setWorkoutPlan] = useState(null);

    const[loading,setLoading] = useState(true);
    const[message,setMessage] = useState("");

    const[generatingPlan, setGeneratingPlan] = useState(false);
    const [regeneratingPlan, setRegeneratingPlan] = useState(false);

    const generatePlan = async () => {
        try {
            setGeneratingPlan(true);
            setMessage("");

            const response = await fetch(
                "http://localhost:5000/api/ai-plan",
                {
                    method:"POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if(!response.ok) {
                setMessage(
                    data.message || "Failed to generate AI plan"
                );
                return;
            }

            setWorkoutPlan(data.workoutPlan);
            setDietPlan(data.dietPlan);

            setMessage("AI plan generated successfully");
        } catch (error) {
            console.error("AI plan generation error:",error);
            setMessage("Something went wrong while generating the AI plan");
        } finally {
            setGeneratingPlan(false);
        }
    };

    const regeneratePlan = async () => {
        try {
            setRegeneratingPlan(true);
            setMessage("");

            const response = await fetch(
                "http://localhost:5000/api/ai-plan?regenerate=true",
                {
                    method: "POST",
                    headers: {
                        "Authorization":`Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message ||"Failed to regenerate AI plan"
                );
                return;
            }

            setWorkoutPlan(data.workoutPlan);
            setDietPlan(data.dietPlan);

            setMessage("AI plan regenerated successfully");

        } catch (error) {
            console.error("AI plan regeneration error:",error);
            setMessage(
                "Something went wrong while regenerating the AI plan"
            );
        } finally {
            setRegeneratingPlan(false);
        }
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [profileResponse, dietResponse, workoutResponse] =
                    await Promise.all([
                        fetch("http://localhost:5000/api/profile", {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }),
                    
                        fetch("http://localhost:5000/api/diet", {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }),
                    
                        fetch("http://localhost:5000/api/workout", {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                    ]);
                
                const profileData = await profileResponse.json();
                const dietData = await dietResponse.json();
                const workoutData = await workoutResponse.json();
                
                if (profileResponse.ok) {
                    setProfile(profileData.profile);
                } else {
                    setMessage(
                        profileData.message || "Could not fetch profile"
                    );
                }
            
                if (dietResponse.ok) {
                    setDietPlan(dietData.dietPlan);
                } else {
                    setMessage(
                        dietData.message || "Could not fetch diet plan"
                    );
                }
            
                if (workoutResponse.ok) {
                    setWorkoutPlan(workoutData.workoutPlan);
                } else {
                    setMessage(
                        workoutData.message || "Could not fetch workout plan"
                    );
                }
            
            } catch (error) {
                console.error("Dashboard error:", error);
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

            {(!dietPlan || !workoutPlan) && (
                <div>
                    <h3>Your AI Plan</h3>

                    <p>
                        You don't have an AI plan yer. Generate one based on your profile.
                    </p>

                    <button 
                        onClick={generatePlan}
                        disabled={generatingPlan}
                    >
                        {generatePlan
                            ? "Generating AI Plan..."
                            : "Generate AI Plan"
                        }
                    </button>
                </div>
            )}

            {dietPlan && workoutPlan && (
                <div>
                    <button
                        onClick={regeneratePlan}
                        disabled={regeneratingPlan}
                    >
                        {regeneratingPlan
                            ? "Regenerating AI Plan..."
                            : "Regenerate AI Plan"
                        }
                    </button>
                </div>
            )}

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
                        <div key={day.day}>
                            <h4>
                                {day.day} - {day.focus}
                            </h4>

                            {day.exercises.length === 0 ? (
                                <p>{day.notes}</p>
                            ) : (
                                day.exercises.map((exercise, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{exercise.name}</strong>
                                        </p>
                                
                                        <p>
                                            Sets: {exercise.sets} | Reps: {exercise.reps}
                                        </p>
                                
                                        {exercise.restPeriod && (
                                            <p>
                                                Rest: {exercise.restPeriod}
                                            </p>
                                        )}

                                        {exercise.duration && (
                                            <p>
                                                Duration: {exercise.duration}
                                            </p>
                                        )}

                                        {exercise.intensity && (
                                            <p>
                                                Intensity: {exercise.intensity}
                                            </p>
                                        )}
                                    </div>
                                ))
                            )}

                            {day.notes && (
                                <p>
                                    <strong>Notes:</strong> {day.notes}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;