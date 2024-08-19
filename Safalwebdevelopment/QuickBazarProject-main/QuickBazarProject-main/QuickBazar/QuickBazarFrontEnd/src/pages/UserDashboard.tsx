import React, { useState, useEffect } from 'react';
import ProductCard from "../pages/homePage/ProductCard.tsx"; // Assuming ProductCard component is in the same directory
import "../css/userDashboard.css";
import Navbar from "./navbar/Navbar.tsx";
import { IoPersonCircleOutline } from "react-icons/io5";

const UserDashboard: React.FC = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [userName, setUserName] = useState(""); // Initialize as an empty string

    useEffect(() => {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem('userId');
        const storedUserName = localStorage.getItem('fullName');

        // Set user name in state
        if (storedUserName) {
            setUserName(storedUserName);
            console.log(localStorage);
        }

        // Fetch user posts if user ID is available
        if (userId) {
            const fetchUserPosts = async () => {
                try {
                    // Make a request to fetch user posts (products) from the backend using user ID
                    const response = await fetch(`http://localhost:8082/product/findByUserId/${userId}`);
                    const postData = await response.json();
                    setUserPosts(postData);
                } catch (error) {
                    console.error('Error fetching user posts:', error);
                }
            };

            fetchUserPosts();
        }
    }, []); // Fetch user posts only once when the component mounts

    return (
        <>
            <div className={"navbar-div"}>
                <Navbar/>
            </div>

            <div className="user-dashboard">

                <div className="container">
                    <div className="left-panel">
                        <div className={"user_icon"}>
                            <span >
                                <IoPersonCircleOutline size={100} />
                            </span>
                            <div className="userInfo">
                                <h2>{userName}</h2>
                            </div>

                        </div>
                    </div>
                    <div className="middle-panel">
                        <h1>My Product List</h1>
                        <div className="products">
                            {userPosts.map((post) => (
                                <ProductCard key={post.id} productId={post.id} />
                            ))}
                        </div>
                    </div>
                    <div className="right-panel">
                        {/* Content for right panel */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
