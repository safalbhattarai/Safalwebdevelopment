import "../../css/manageSubCategory.css";
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {FaPlus, FaRegWindowClose, FaSearch} from "react-icons/fa";
import gsap from "gsap";
import AdminSidebar from "./adminSidebar.tsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import {useNavigate} from "react-router-dom";


const ManageSubCategory: React.FC = () =>  {

    const[search,setSearch] = useState('');
    const navigate = useNavigate();

    // Add Items modal
    const [modal, setModal] = useState(false);

    const toggleItemModal = () => {
        if (modal) {
            reset(); // Reset the form
        }
        setModal(!modal); // Toggle the modal
    };

    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    // GSAP cdn for animation
    useEffect(() => {
        if (modal) {
            gsap.from(".add-item-modal", {
                y: -50,
                duration: 0.3,
                opacity: 0,
            });
        }
    }, [modal]);


    //hitting server on port 8082
    const{register,
        handleSubmit,
        formState
        ,reset}=useForm();

    const{errors} = formState;

    const useApiCall = useMutation({
        mutationKey:["POST_SUBCATEGORY_DATA"],
        mutationFn:(payload:any)=>{
            console.log(payload)
            return axios.post("http://localhost:8082/subCategory/save",payload)
        },onSuccess: () => {
            // notify();
            reset();
            refetch();
        }
    })

    const onSubmit = async (value: any) => {
        try {
            const payload = {
                subCategoryName: value?.subCategoryName,
                categoryId: value?.categoryId
            };

            const response = await axios.post(
                "http://localhost:8082/subCategory/save",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(response.data);
            reset(); // Reset the form
            refetch(); // Refetch the data after successful submission
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        }
    };


    // Fetching data from API
    const{data,refetch} = useQuery({
        queryKey:["GET_ITEM_DATA"],
        queryFn(){
            return axios.get("http://localhost:8082/subCategory/findAll")
        }
    })

    //Searching data
    const filteredSubCategoryData = data?.data.filter((subCategory) =>
        subCategory.subCategoryName.toLowerCase().includes(search.toLowerCase()) ||
        subCategory.id.toString().includes(search.toLowerCase()) ||
        subCategory.category?.name.toLowerCase().includes(search.toLowerCase())
    );

    console.log(filteredSubCategoryData)

    const { data: categories } = useQuery({
        queryKey: ["GET_CATEGORIES"],
        queryFn() {
            return axios.get("http://localhost:8082/category/findAll"); // Replace with your actual API endpoint
        },
    });

    //Deleting data
    const deleteByIdApi=useMutation(
        {
            mutationKey:["DELETE_ITEM_BY_ID"],
            mutationFn(id:number){
                return axios.delete("http://localhost:8082/subCategory/delete/"+id);
            },onSuccess(){refetch()}
        }
    )

    console.log(filteredSubCategoryData)

    return(
        <div>
            <div className={"manage-SubCategory-page"}>
                <div className={"itempage-left"} >
                    <AdminSidebar />
                </div>

                <div className={"subCategoryPage-right"}>
                    <header className={"subCategoryPage-header"}>
                        <h1>Manage Sub-Category</h1>

                        <div className={"search-wrapper"}>
                            <span><FaSearch /></span>
                            <input type={"search"} placeholder={"Search Sub-Categories"} value={search} onChange={(e)=>setSearch(e.target.value)}/>
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
                            <div className={"btn3"}>
                                <button type={"button"} onClick={toggleItemModal}><span><FaPlus style={{fontSize:"1.5rem",marginBottom:"-1px",color:"white"}}/></span></button>
                            </div>

                            <div className={"table-container2"}>
                                <div className={"card-header2"}>
                                    <h2>Sub-Category</h2>
                                </div>
                                <div className={"card-body2"}>
                                    <table className={"table1"}>
                                        <thead>
                                        <tr>
                                            <th className={"id-box3"}>Id</th>
                                            <th className={"name-box3"}>Sub-Category</th>
                                            <th className={"category-box3"}>Category</th>
                                            <th className={"action-box3"}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            filteredSubCategoryData
                                                ?.sort((a, b) => a.id - b.id)
                                                .map((i) =>{
                                                    return(
                                                        <tr key={i?.id}>
                                                            <td>{i?.id}</td>
                                                            <td>{i?.subCategoryName}</td>
                                                            <td>{i?.category?.name}</td>
                                                            <td>
                                                                <button className={"edit-btn3"} onClick={()=>{
                                                                    navigate("/editItem/"+i?.id);
                                                                    // console.log(i?.id)
                                                                }}><CiEdit />
                                                                </button>
                                                                <button className={"delete-btn3"} onClick={() => {
                                                                    if (window.confirm("Are you sure you want to delete this Sub-Category?")) {
                                                                        deleteByIdApi.mutate(i?.id);
                                                                    }
                                                                }}><MdDelete />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modal && (
                <div className="add-item-modal">
                    <div onClick={toggleItemModal} className="add-item-overlay"></div>
                    <div className="add-item-modal-content">
                        <h2>Add Sub-Category</h2>
                        <button className="close-add-item-btn" onClick={toggleItemModal}>
                            <FaRegWindowClose />
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={"select-category"}>
                                <label>Category</label>
                                <select id={"category-option"} placeholder={""} {...register("categoryId", { required: true })}>
                                    <option>Select a Category</option>
                                    {categories &&
                                        categories.data.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className={"sub-Category-name"}>
                                <label>Sub-Category Name</label>
                                <input type={"text"} placeholder={"Sub-Category Name"} {...register("subCategoryName",{required:"subCategory Name is required!!"})}/>
                                <h6 style={{paddingLeft:"1px"}}>{errors?.subCategoryName?.message}</h6>
                            </div>

                            <div className={"subCategory-name-add-btn"}>
                                <button type={"submit"}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSubCategory;
