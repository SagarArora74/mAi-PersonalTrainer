import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login"
import Register from "./Register"
import Profile from "./Profile"
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register /> }/>

                <Route 
                    path="/profile" 
                    element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;