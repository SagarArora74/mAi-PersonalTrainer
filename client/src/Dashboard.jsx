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
            <div className ="dashboard-container">
                <div className="dashboard-header">
                    <div>
                        <h1>AI Personal Trainer</h1>
                        <p>Your personalized fitness dashboard</p>
                    </div>

                    <button onClick={() => navigate("/profile")}>
                        Edit Profile
                    </button>
                </div>
            </div>
            
            <h2>Dashboard</h2>

            {planStatus?.isOutdated && (
                <div>
                    <p>
                        Your profile has changed since your AI plan was generated.
                        Please regenerate your Plan to reflect your latest profile.
                    </p>

                </div>
            )}
            <h3>Your Profile</h3>

            <div className="profile-grid">

            <div className="profile-card">
                <span>Age</span>
                <strong>{profile.age}</strong>
                <small>years</small>
            </div>
                
            <div className="profile-card">
                <span>Gender</span>
                <strong>{profile.gender}</strong>
            </div>
                
            <div className="profile-card">
                <span>Height</span>
                <strong>{profile.height}</strong>
                <small>cm</small>
            </div>
                
            <div className="profile-card">
                <span>Weight</span>
                <strong>{profile.weight}</strong>
                <small>kg</small>
            </div>
                
            <div className="profile-card">
                <span>Goal</span>
                <strong>{profile.goal}</strong>
            </div>
                
            <div className="profile-card">
                <span>Activity</span>
                <strong>{profile.daily_physical_activity}</strong>
            </div>
                
            <div className="profile-card">
                <span>Experience</span>
                <strong>{profile.experience}</strong>
            </div>
                
            <div className="profile-card">
                <span>Diet</span>
                <strong>{profile.diet}</strong>
            </div>
                
            <div className="profile-card">
                <span>Training Days</span>
                <strong>{profile.daysPerWeek}</strong>
                <small>days / week</small>
            </div>
                
        </div>

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

                    <div className="nutrition-grid">

                        <div className="nutrition-card">
                            <span>Calorie Goal</span>
                            <strong>{dietPlan.calorieGoal}</strong>
                            <small>kcal / day</small>
                        </div>

                        <div className="nutrition-card">
                            <span>Protein Goal</span>
                            <strong>{dietPlan.proteinGoal}</strong>
                            <small>g / day</small>
                        </div>

                        <div className="nutrition-card">
                            <span>BMR</span>
                            <strong>{dietPlan.bmr}</strong>
                            <small>kcal / day</small>
                        </div>

                        <div className="nutrition-card">
                            <span>TDEE</span>
                            <strong>{dietPlan.tdee}</strong>
                            <small>kcal / day</small>
                        </div>

                    </div>

                    <div className="meal-grid">
                        {dietPlan.meals.map((meal) => (
                            <div className="meal-card" key={meal.mealName}>
                            
                                <h4>{meal.mealName}</h4>
                        
                                <div className="meal-stats">
                                    <span>{meal.calories} kcal</span>
                                    <span>{meal.proteinG} g protein</span>
                                </div>
                        
                                <ul>
                                    {meal.items.map((item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                
                            </div>
                        ))}
                    </div>
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

                    <div className="workout-grid">
                        {workoutPlan.plan.map((day) => (
                            <div
                                className={
                                    day.exercises.length === 0
                                        ? "workout-card rest-card"
                                        : "workout-card"
                                }
                                key={day.day}
                            >
                            
                                <h4>
                                    {day.day} - {day.focus}
                                </h4>
                        
                                {day.exercises.length === 0 ? (
                                    <p className="rest-day">
                                        {day.notes}
                                    </p>
                                ) : (
                                    <div className="exercise-list">
                                    
                                        {day.exercises.map((exercise, index) => (
                                            <div className="exercise" key={index}>
                                            
                                                <p>
                                                    <strong>{exercise.name}</strong>
                                                </p>
                                        
                                                <div className="exercise-details">

                                                    {exercise.sets && (
                                                        <span>
                                                            {exercise.sets} Sets
                                                        </span>
                                                    )}
                                                
                                                    {exercise.reps && (
                                                        <span>
                                                            {exercise.reps} Reps
                                                        </span>
                                                    )}
                                                
                                                    {exercise.restPeriod && (
                                                        <span>
                                                            Rest: {exercise.restPeriod}
                                                        </span>
                                                    )}
                                                
                                                </div>
                    
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
                                        ))}
                    
                                    </div>
                                )}
                    
                                {day.notes && day.exercises.length > 0 && (
                                    <p className="workout-notes">
                                        <strong>Notes:</strong> {day.notes}
                                    </p>
                                )}
                    
                            </div>
                        ))}
                    </div>
                    {workoutPlan && workoutPlan.guidelines && (
                        <div className="guidelines-section">
                            <h3>Workout Guidelines</h3>

                            <div className="guidelines-card">
                                <ul>
                                    {workoutPlan.guidelines.map((guideline, index) => (
                                        <li key={index}>
                                            {guideline}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Dashboard;