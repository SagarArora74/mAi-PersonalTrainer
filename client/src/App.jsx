import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    age:"",
    height: "",
    weight: "",
    goal: "",
    daily_physical_activity: "",
    experience: "",
    diet: "",
    daysPerWeek: ""
  });


const handleChange = (event) => {
  const {name,value} = event.target;

  setFormData({
    ...formData,
    [name]: value
  });
};

const handleSubmit = (event) => {
  event.preventDefault();

  console.log(formData);
};

return (
  <div>
    <h1> AI Fitness Coach</h1>

    <h2> Tell me about yourself</h2>
    
    <form onSubmit = {handleSubmit}>
      <div>
        <label>Age</label>
        <input 
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Height (cm)</label>
        <input 
          type = "number"
          name = "height"
          value= {formData.height}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Weight (kg)</label>
        <input 
          type = "number"
          name = "weight"
          value = {formData.weight}
          onChange = {handleChange}
        />
      </div>

      <div>
        <label>Goal</label>
        <select
        name = "goal"
        value={formData.goal}
        onChange={handleChange}
        >
          <option value = "">Select your goal</option>
          <option value = "weight_loss">Weight Loss</option>
          <option value = "muscle_gain">Muscle Gain</option>
          <option value = "maintenance">Maintenance</option>
        </select>
      </div>

      <div>
        <label>How Active are you daily ?</label>
        <select
          name="daily_physical_activity"
          value={formData.daily_physical_activity}
          onChange={handleChange}
        >
          <option value="">Select activity level</option>
          <option value="lowly_active">Lowly Active (&lt; 3k steps)</option>
          <option value="moderately_active">Moderately Active (5-6k steps)</option>
          <option value="">Highly Active (&gt; 10k steps)</option>
        </select>
      </div>

      <div>
        <label>Experience Level</label>

        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        >
          <option value="">Select experience</option>
          <option value="beginner">Noob</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Pro</option>
        </select>
      </div>

      <div>
        <label>Diet Preference</label>

        <select
          name="diet"
          value={formData.diet}
          onChange={handleChange}
        >
          <option value="">Select diet</option>
          <option value="vegetarian">Attention Seeker(Vegetarian)</option>
          <option value="">Non-Vegetarian</option>
          <option value="eggetarian">Eggitarian (bruhhh...)</option>
          <option value="began">Bitch (Vegan)</option>
        </select>
      </div>

      <div>
        <label>Workout Days Per Week</label>
        <input
          type="number"
          name="daysPerWeek"
          min="1"
          max="7"
          value={formData.daysPerWeek}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        Create My Profile
      </button>
    </form>
  </div>
);
}
export default App;