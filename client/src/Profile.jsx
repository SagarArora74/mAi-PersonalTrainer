import { useState } from "react";

function Profile() {
    const [formData, setFormData] = useState({
        age: "",
        height: "",
        weight: "",
        goal: "",
        daily_physical_activity: "",
        experience: "",
        diet: "",
        daysPerWeek: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...formData,
                        age: Number(formData.age),
                        height: Number(formData.height),
                        weight: Number(formData.weight),
                        daysPerWeek: Number(formData.daysPerWeek)
                    })
                }
            );
            const data = await response.json();

            if(response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.message || "Profile creation failed");
            }
            
            console.log(data);

        } catch (error) {
            console.error("Profile error:", error);
            setMessage("Something went wrong")
        }
    };
    return (
        <div>
            <h2>Create Profile</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Height:</label>
                    <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Weight:</label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Goal:</label>
                    <select
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select goal</option>
                        <option value="weight_loss">Weight Loss</option>
                        <option value="muscle_gain">Muscle Gain</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>

                <div>
                    <label>Daily Physical Activity:</label>
                    <select
                        name="daily_physical_activity"
                        value={formData.daily_physical_activity}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select activity</option>
                        <option value="lowly_active">Lowly Active</option>
                        <option value="moderately_active">Moderately Active</option>
                        <option value="highly_active">Highly Active</option>
                    </select>
                </div>

                <div>
                    <label>Experience:</label>
                    <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select experience</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <label>Diet:</label>
                    <select
                        name="diet"
                        value={formData.diet}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select diet</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="non_vegetarian">Non-Vegetarian</option>
                        <option value="eggitarian">Eggitarian</option>
                        <option value="vegan">Vegan</option>
                    </select>
                </div>

                <div>
                    <label>Days Per Week:</label>
                    <input
                        type="number"
                        name="daysPerWeek"
                        min="1"
                        max="7"
                        value={formData.daysPerWeek}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    Create Profile
                </button>

            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Profile;