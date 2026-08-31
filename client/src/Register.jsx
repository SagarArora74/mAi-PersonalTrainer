import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const { login } = useAuth();
    
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

            if(response.ok) {

            login(data.token);
            setMessage("Registration successful");

            navigate("/profile");

            } else {
                setMessage(data.message);
            }
            console.log(data);

        } catch (error) {
            console.error("Registration error:", error);
            setMessage("Something went wrong");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <h2>Create Account</h2>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <div className="auth-field">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">
                        Register
                    </button>
                    <p className="auth-link">
                        Already have an account?{" "}
                        <Link to="/">Login</Link>
                    </p>

                </form>

                {message && (
                    <p className="auth-message">
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
}

export default Register;