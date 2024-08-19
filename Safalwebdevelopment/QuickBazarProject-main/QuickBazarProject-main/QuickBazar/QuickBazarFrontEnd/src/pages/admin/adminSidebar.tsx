import React from "react";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TiHome } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";
import {FaRegUser, FaUserCog} from "react-icons/fa";
import "../../css/adminSidebar.css";




const AdminSidebar: React.FC = () => {
    return (
        <div className="admin-sidebar">
            <div className="sidebar-brand">
                <h1>
          <span>
            <TiHome style={{ fontSize: "4rem", marginBottom: "-4px", color: "black" }} />
          </span >
                    Quick Bazar
                </h1>
            </div>

            <div className="sidebar-options">
                <ul className="sidebar-list">
                    <Link to="/AdminDashboard">
                        <li className="sidebar-list-item">
              <span>
                <MdSpaceDashboard style={{ fontSize: "18px", marginBottom: "-3px" }} />
              </span>
                            <a href="/">Dashboard</a>
                        </li>
                    </Link>

                    <Link to="/CustomerPage">
                        <li className="sidebar-list-item">
              <span>
                <FaUserCog style={{ fontSize: "18px", marginBottom: "-3px" }} />
              </span>
                            <a href="/">Customers</a>
                        </li>
                    </Link>

                    <Link to="/ManageCategory">
                        <li className="sidebar-list-item">
              <span>
                <BiSolidCategoryAlt style={{ fontSize: "18px", marginBottom: "-3px" }} />
              </span>
                            <a href="/">Manage Category</a>
                        </li>
                    </Link>

                    <Link to="/ManageSubCategory">
                        <li className="sidebar-list-item">
                            <span>
                                <BiSolidCategoryAlt style={{ fontSize: "18px", marginBottom: "-3px" }} />
                            </span>

                            <a href="/">Manage Sub-Category</a>
                        </li>
                    </Link>

                    <Link to="/ManageProduct">
                        <li className="sidebar-list-item">
                            <span>
                                <BiSolidCategoryAlt style={{ fontSize: "18px", marginBottom: "-3px" }} />
                            </span>

                            <a href="/">Manage Product</a>
                        </li>
                    </Link>

                </ul>
            </div>

            <div className="sidebar-btn">
                <Link to="/Login">
                    <button><span><IoMdLogOut style={{ fontSize: "1.3rem", marginBottom: "-3px", marginRight: "3px" }} /></span> Log Out</button>
                </Link>
            </div>
        </div>
    );
};

export default AdminSidebar;
