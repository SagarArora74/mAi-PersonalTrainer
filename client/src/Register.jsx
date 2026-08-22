import { useState } from "react";

function Register() {
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        const {name,value} = event.target;

        setFormData({
            ...formData,
            [name]:value
        });
    };

        
   
    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            setMessage(data.message);
            console.log(data);
        } catch (error) {
            console.error("Registration error:", error);
            setMessage("Something went wrong");
        }
    };

    return (
        <div>
            <h1>Create Account</h1>

            <form onSubmit = {handleSubmit}>

                <div>
                    <label> Name</label>

                    <input
                        type = "text"
                        name = "name"
                        value = {formData.name}
                        onChange = {handleChange}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button type = "submit">
                    Register
                </button>

            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;