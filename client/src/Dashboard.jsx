import { useEffect , useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard () {
    const { token } = useAuth();
    const navigate = useNavigate();

    const[profile, setProfile] = useState(null);
    const[dietPlan, setDietPlan] = useState(null);
    const[workoutPlan, setWorkoutPlan] = useState(null);
    const[planStatus, setPlanStatus] = useState(null);

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
            setPlanStatus({
                hasPlans: true,
                isOutDated: false
            });

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

            setPlanStatus({
                hasPlans: true,
                isOutDated: false
            });

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
                const statusResponse = await fetch(
                    "http://localhost:5000/api/ai-plan/status",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                const statusData = await statusResponse.json();

                if(statusResponse.ok) {
                    setPlanStatus(statusData);
                }
                
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
            <button 
                onClick = {() => navigate("/profile")}
            >
                Edit Profile
            </button>

            {planStatus?.isOutdated && (
                <div>
                    <p>
                        Your profile has changed since your AI plan was generated.
                        Please regenerate your Plan to reflect your latest profile.
                    </p>

                </div>
            )}
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
                        You don't have an AI plan yet. Generate one based on your profile.
                    </p>

                    <button 
                        onClick={generatePlan}
                        disabled={generatingPlan}
                    >
                        {generatingPlan
                            ? "Generating Plan..."
                            : "Generate Plan"
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
                            ? "Regenerating Plan..."
                            : "Regenerate Plan"
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

                    <h3> Diet Plan</h3> 
                    <p>
                        Diet Type: {dietPlan.dietType}
                    </p>

                    {dietPlan.meals.map((meal) => (
                        <div key={meal.mealName}>
                            <h4>{meal.mealName}</h4>

                            <p>
                                Calories: {meal.calories} kcal
                            </p>

                            <p>
                                Protein: {meal.proteinG} g
                            </p>
                            <ul>
                                {meal.items.map((item,index)=> (
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            {workoutPlan && (
                <div>
                    <h3>Your Workout Plan</h3>
                    {workoutPlan.splitName && (
                        <h4>{workoutPlan.splitName}</h4>
                    )}
                    {workoutPlan.description && (
                        <p>{workoutPlan.description}</p>
                    )}

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
                    {workoutPlan.guidelines && 
                        workoutPlan.guidelines.length > 0 && (
                            <div>
                                <h4>Guidelines</h4>

                                <ul>
                                    {workoutPlan.guidelines.map((guideline,index)=> (
                                        <li key={index}>
                                            {guideline}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}

export default Dashboard;