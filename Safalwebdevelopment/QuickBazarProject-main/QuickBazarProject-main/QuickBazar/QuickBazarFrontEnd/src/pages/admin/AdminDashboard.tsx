import "../../css/adminDashboard.css"
import {FaUserCog} from "react-icons/fa";
import AdminSidebar from "./adminSidebar.tsx";
import {Link} from "react-router-dom";
import {BiSolidCategoryAlt} from "react-icons/bi";
import {GoHomeFill} from "react-icons/go";


function AdminDashboard(){


    return(
        <>
            <div className={"admin-dashboard-page"}>
                <div className={"dashboard-left"} >
                    <AdminSidebar/>
                </div>

                <div className={"dashboard-right"}>
                    <header className={"dashboard-header"}>
                        <h1>Dashboard</h1>
                        <div className={"user-wrapper"}>
                            <img src={"https://images.pexels.com/photos/14073969/pexels-photo-14073969.jpeg?auto=compress&cs=tinysrgb&w=800"} width={"40px"} height={"40px"} alt={"N"}/>
                            <div>
                                <h4>Admin</h4>
                            </div>
                        </div>
                    </header>

                    <div className={"dashboard-main-content"}>
                        <div className={"d-main-content"}>
                            <div className={"dashboard-cards-container"}>
                                <Link to={"/CustomerPage"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Customers</h2>
                                        </div>
                                        <span><FaUserCog style={{fontSize:"4vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>

                                <Link to={"/ManageCategory"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Categories</h2>

                                        </div>
                                        <span><BiSolidCategoryAlt style={{fontSize:"4vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                                <Link to={"/ManageSubCategory"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>SubCategory</h2>

                                        </div>
                                        <span><BiSolidCategoryAlt style={{fontSize:"3.8vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>

                                <Link to={"/ManageProduct"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>All Product</h2>

                                        </div>
                                        <span><BiSolidCategoryAlt style={{fontSize:"3.8vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>

                                <Link to={"/HomePage"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Go to</h2>
                                            <h3 style={{marginTop:"-0.6rem"}}>Home</h3>
                                        </div>
                                        <span><GoHomeFill style={{fontSize:"3.8vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default AdminDashboard;

