import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";
import Navbar from "./navbar/Navbar.tsx";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigation = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8082/register/login", formData);
            console.log(response.data); // Handle successful login response
            alert("Login successful!");
            localStorage.setItem("token","login-token");
            localStorage.setItem("userId",response.data.id);
            localStorage.setItem("userName", response.data.fullName); // Set user's full name in localStorage
            console.log(localStorage);
            console.log('Set UserId to', response.data.id);
            console.log('Set UserName to', response.data.fullName);
            navigation("/homePage");
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Invalid email or password.");
        }
    };

    return (
        <>
            <div className="navbar-div">
                <Navbar />
            </div>

            <div className="main-div">
                <div className="login-div">
                    <form className="form-div" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <span className="iconmail"><FaUser /></span>
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
                            <span className="iconpassword"><RiLockPasswordFill /></span>
                            <div className="password">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="Remember-forget">
                            <label><input type="checkbox" />Remember me</label>
                            <p> Don't have an account?
                                <Link to="/ForgetPassword">
                                    <a >Forget Password ?</a>
                                </Link>
                            </p>
                        </div>

                        <button type="submit" className="submit-btn">Login</button>

                        <div className="register-text">
                            <p> Don't have an account?
                                <Link to="/RegistrationPage">
                                    <a >Register</a>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;


