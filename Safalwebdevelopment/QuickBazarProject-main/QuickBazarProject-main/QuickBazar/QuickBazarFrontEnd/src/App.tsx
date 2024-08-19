import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage.tsx";
import Login from "./pages/Login.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import ForgetPassword from "./pages/ForgetPassword.tsx";
import AdminSidebar from "./pages/admin/adminSidebar.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import CustomerPage from "./pages/admin/CustomerPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManageCategory from "./pages/admin/ManageCategory.tsx";
import EditCategory from "./pages/admin/editCategory.tsx";
import ManageSubCategory from "./pages/admin/ManageSubCategory.tsx";
import ManageProduct from "./pages/admin/ManageProduct.tsx";
import PostProduct from "./pages/PostProduct.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";


function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* Redirect to homepage when root path is accessed */}
                    <Route path="/" element={<Navigate to="/homepage" />} />
                    {/* Routes for different pages */}
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registrationPage" element={<RegistrationPage />} />
                    <Route path="/forgetPassword" element={<ForgetPassword />} />
                    <Route path="/adminSidebar" element={<AdminSidebar />} />
                    <Route path="/adminDashboard" element={<AdminDashboard />} />
                    <Route path="/customerPage" element={<CustomerPage />} />
                    <Route path="/manageCategory" element={<ManageCategory />} />
                    <Route path="/editCategory" element={<EditCategory />} />
                    <Route path="/manageSubCategory" element={<ManageSubCategory />} />
                    <Route path="/manageProduct" element={<ManageProduct />} />
                    <Route path="/postProduct" element={<PostProduct />} />
                    <Route path="/userDashboard" element={<UserDashboard />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
