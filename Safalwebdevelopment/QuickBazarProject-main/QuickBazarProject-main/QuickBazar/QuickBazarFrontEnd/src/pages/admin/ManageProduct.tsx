import "../../css/manageProduct.css";
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from "./adminSidebar.tsx";
import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import {MdDelete} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {FaSearch} from "react-icons/fa";


const ManageProduct: React.FC = () =>  {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Fetching data from API
    const {data, refetch} = useQuery({
        queryKey: ["GET_PRODUCT_DATA"],
        queryFn() {
            return axios.get("http://localhost:8082/product/findAll")
        }
    });

    //Searching data
    const filteredPRODUCTData = data?.data.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toString().includes(search.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(search.toLowerCase()) ||
        product.subCategory?.subCategoryName.toLowerCase().includes(search.toLowerCase())
    );

    //Deleting data
    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_PRODUCT_BY_ID"],
        mutationFn(id: number) {
            return axios.delete("http://localhost:8082/product/delete/" + id);
        },
        onSuccess() {
            refetch();
        }
    });

    return(
        <div>
            <div className={"manage-SubCategory-page"}>
                <div className={"itempage-left"} >
                    <AdminSidebar />
                </div>

                <div className={"subCategoryPage-right"}>
                    <header className={"subCategoryPage-header"}>
                        <h1>Search-products</h1>

                        <div className={"search-wrapper"}>
                            <span><FaSearch /></span>
                            <input type={"search"} placeholder={"Search any product"} value={search} onChange={(e) => setSearch(e.target.value)}/>
                        </div>

                        <div className={"user-wrapper"}>
                            <img src={"https://images.pexels.com/photos/14073969/pexels-photo-14073969.jpeg?auto=compress&cs=tinysrgb&w=800"} width={"40px"} height={"40px"} alt={"N"}/>
                            <div>
                                <h4>Admin</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                    </header>

                    <div className={"subCategory-main-content"}>
                        <div className={"sub-main-content"}>
                            <div className={"table-container2"}>
                                <div className={"card-header2"}>
                                    <h2>All Products</h2>
                                </div>
                                <div className={"card-body2"}>
                                    <table className={"table1"}>
                                        <thead>
                                        <tr>
                                            <th className={"id-box3"}>Id</th>
                                            <th className={"category-box3"}>Category</th>
                                            <th className={"category-box3"}>subCategory</th>
                                            <th className={"name-box3"}>Name</th>
                                            <th className={"brand-box3"}>Brand</th>
                                            <th className={"condition-box3"}>Condition</th>
                                            <th className={"price-box3"}>Price</th>
                                            <th className={"address-box3"}>Address</th>
                                            <th className={"description-box3"}>Description</th>
                                            <th className={"image-box3"}>Image</th>
                                            <th className={"action-box3"}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredPRODUCTData
                                            ?.sort((a, b) => a.id - b.id)
                                            .map((i) => (
                                                <tr key={i?.id}>
                                                    <td>{i?.id}</td>
                                                    <td>{i?.category?.name} </td>
                                                    <td>{i?.subCategory?.subCategoryName} </td>
                                                    <td>{i?.productName}</td>
                                                    <td>{i?.productBrand}</td>
                                                    <td>{i?.productCondition}</td>
                                                    <td>{i?.price}</td>
                                                    <td>{i?.address}</td>
                                                    <td>{i?.productDiscription}</td>
                                                    {/*<td>{i?.productImage}</td>*/}

                                                    <td style={{display:"flex",justifyContent:"center"}}>
                                                        <img src={'data:image/jpeg;base64,'+i?.productImage} width={"40px"}/>
                                                    </td>

                                                    <td>
                                                        <button className={"delete-btn3"} onClick={() => {
                                                            if (window.confirm("Are you sure you want to delete this product?")) {
                                                                deleteByIdApi.mutate(i?.id);
                                                            }
                                                        }}>
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;
