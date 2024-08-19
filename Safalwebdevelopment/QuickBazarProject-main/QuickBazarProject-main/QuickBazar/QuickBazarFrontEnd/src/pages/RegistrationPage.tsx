// RegistrationPage.tsx
import React, { useState } from "react";
import axios from "axios";
import "../css/registrationPage.css";
import Navbar from "./navbar/Navbar.tsx";

const RegistrationPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        securityQuestion: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8082/register/register", formData);
            alert("User registered successfully!");
            // Redirect or perform other actions after successful registration
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred while registering user.");
        }
    };

    return (
        <>
            <div className="navbar-div">
                <Navbar />
            </div>

            <div className="main-div">
                <div className="register-div">
                    <form className="form-div" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <h3>Security Question?</h3>
                                <input
                                    type="text"
                                    name="securityQuestion"
                                    placeholder="Your Favorite Bank Account Name"
                                    value={formData.securityQuestion}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegistrationPage;
