import "../../css/customerPage.css";
import AdminSidebar from "./adminSidebar.tsx";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";



const CustomerPage = () => {
    const [search, setSearch] = useState("");
    const { data: userData, refetch } = useQuery({
        queryKey: ["GETDATA"],
        queryFn() {
            return axios.get("http://localhost:8082/register/getAll");
        }
    });

    //Deleting data
    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_BY_ID"],
        mutationFn(id: number) {
            return axios.delete(`http://localhost:8082/register/deleteUserById/${id}`);
        },
        onSuccess() {
            refetch();
        }
    });

    return (
        <>
            <div className="customer-page">
                <AdminSidebar />
                <div className="customer-page-right">
                    <header className="customer-page-header">
                        <h1>Manage Customers</h1>

                        <div className="search-wrapper2" style={{ width: "16rem" }}>
                            <span><FaSearch /></span>
                            <input type="search" placeholder="Search Customers" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </header>
                    <div className="customer-page-main">
                        <div className="no-of-customer">
                            <h2>No. of Customer: {userData?.data.length}</h2>
                        </div>
                        <table className="table1">
                            <thead>
                            <tr>
                                <th className="id-box3">ID</th>
                                <th className="name-box3">Name</th>
                                <th className="name-box2">Email</th>
                                <th className="delete-box2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userData?.data.map((i:any) => (
                                <tr key={i?.id}>
                                    <td>{i?.id}</td>
                                    <td>{i?.fullName}</td>
                                    <td>{i?.email}</td>
                                    <td>
                                        <button
                                            className="delete-btn2"
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this customer?")) {
                                                    deleteByIdApi.mutate(i?.id);
                                                }
                                            }}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerPage;
