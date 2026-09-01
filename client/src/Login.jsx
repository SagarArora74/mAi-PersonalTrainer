import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const [formData , setFormData] = useState({
        email: "",
        password: "",
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

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                login(data.token);
                navigate("/profile");
                setMessage("Login Successful");
                console.log(data);
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.error("Login error:", error);
            setMessage("Something went wrong");
        }
    };
    return (
    <div className="auth-page">
        <div className="auth-content">
            <div className="auth-intro">
                <h1>Welcome back</h1>
                <p>Your journey to a stronger, healthier you starts here.</p>
            </div>

            <div className="auth-card">

                <h2>Login</h2>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <div className="auth-field">
                        <label>Email:</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password:</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button type="submit">
                        Login
                    </button>

                    <p className="auth-link">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>

                </form>

                {message && (
                    <p className="auth-message">
                        {message}
                    </p>
                )}

            </div>
        </div>
    </div>
);
}

export default Login;