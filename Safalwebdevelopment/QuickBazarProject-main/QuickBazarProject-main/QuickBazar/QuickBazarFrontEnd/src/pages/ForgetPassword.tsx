import React, { useState } from "react";
import axios from "axios";
import "../css/forgetPassword.css";
import Navbar from "./navbar/Navbar.tsx";

const ForgetPassword: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "", // Change to newPassword
        confirmPassword: "", // Change to confirmPassword
        securityQuestion: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8082/register/resetPassword", formData);
            alert("Password reset successful!");
            // Redirect or perform other actions after successful password reset
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("An error occurred while resetting password.");
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
                            <div className="username">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="username">
                                <input
                                    type="password"
                                    name="password" // Change to newPassword
                                    placeholder="New Password"
                                    value={formData.password} // Change to newPassword
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="username">
                                <input
                                    type="password"
                                    name="confirmPassword" // Change to confirmPassword
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword} // Change to confirmPassword
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="security">
                                <div className="username">
                                    <h5>Security Question: What is your favorite bank account number?</h5>
                                    <input
                                        type="text"
                                        name="securityQuestion"
                                        placeholder="Enter Answer to Security Question"
                                        value={formData.securityQuestion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">Reset</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;
