import { useState } from "react";

function Login() {
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
                "http://localhost:5000/api/auth/login",
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
                localStorage.setItem("token",data.token);
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
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email:</label>
                    <input 
                        type = "email"
                        name = "email"
                        value = {formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name= "password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type = "submit">
                    Login
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Login;