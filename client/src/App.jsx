import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login"
import Register from "./Register"
import Profile from "./Profile"
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "./AuthContext";
import Dashboard from "./Dashboard"

function App() {
    return (
        <AuthProvider>
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
                    <Route 
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
    
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;