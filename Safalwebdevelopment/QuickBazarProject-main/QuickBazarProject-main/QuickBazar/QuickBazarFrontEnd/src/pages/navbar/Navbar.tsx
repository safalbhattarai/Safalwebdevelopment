import React, { useState, useEffect } from "react";
import { FaRegUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { SiQuicktime } from "react-icons/si";
import "../../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AllProduct from "../homePage/AllProduct.tsx";

const Navbar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    // Fetching data from API
    const { data, refetch } = useQuery({
        queryKey: ["GET_PRODUCT_DATA"],
        queryFn() {
            return axios.get("http://localhost:8082/product/findAll")
        }
    });

    useEffect(() => {
        const storedLoginState = localStorage.getItem("token");
        if (storedLoginState && storedLoginState === "true") {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/homePage");
    };

    const handleSearch = () => {
        const filteredData = data?.data.filter((product) =>
            product.productName.toLowerCase().includes(search.toLowerCase()) ||
            product.id.toString().includes(search.toLowerCase()) ||
            product.category?.name.toLowerCase().includes(search.toLowerCase()) ||
            product.subCategory?.subCategoryName.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filteredData);
        setShowPopup(true);
    };

    return (
        <nav className="main-nav">
            <div className="logo">
                <Link to="/HomePage">
                    <h2>
                        <span>Q</span>uick <span>B</span>azar
                    </h2>
                    <h1>
                        <SiQuicktime />
                    </h1>
                </Link>
            </div>
            <div className="search-bar">
                <ul>
                    <li>
                        <div className="search-wrapper">
                            <input type={"search"} placeholder={"Search any product"} value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <button className="btnn" onClick={handleSearch}>
                                <FaSearch />
                            </button>
                        </div>
                    </li>
                    <li className="post-button">
                        <Link to="/postProduct">
                            <button>
                                <span><IoIosAddCircle /></span> Post for free
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>




            <div className="login-register">
                <ul>
                    {!localStorage.getItem("token") && (
                        <>
                            <li>
                                <div className="login-button">
                                    <Link to="/Login">
                                        <button><span><FaRegUser /></span> Login</button>
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="separate-line">
                                    <h1>|</h1>
                                </div>
                            </li>
                            <li>
                                <div className="registration-button">
                                    <Link to="/RegistrationPage">
                                        <button>SignUp</button>
                                    </Link>
                                </div>
                            </li>
                        </>
                    )}
                    {localStorage.getItem("token") && (
                        <li>
                            <div className="login-button">
                                <button onClick={handleLogout} style={{ color: 'red' }}><span><FaSignOutAlt /></span> Logout</button>
                            </div>
                            <li>
                                <div className="registration-button">
                                    <Link to="/UserDashboard">
                                        <button>user</button>
                                    </Link>
                                </div>
                            </li>
                        </li>
                    )}
                </ul>

            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
                        <div className="product-list">
                            {filteredData.map(product => (
                                <AllProduct key={product.id} productId={product.id} />
                            ))}
                        </div>
                    </div>
                </div>
            )}


        </nav>
    );
};

export default Navbar;
