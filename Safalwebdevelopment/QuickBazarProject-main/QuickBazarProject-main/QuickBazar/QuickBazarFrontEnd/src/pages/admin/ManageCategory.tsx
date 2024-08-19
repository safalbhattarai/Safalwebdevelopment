import "../../css/ManageCategory.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
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


const ManageCategory: React.FC = () =>  {

    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null); // State to store data for editing
    const navigate = useNavigate();


    // Add category modal
    const [modal1, setModal] = useState(false);
    const toggleCatgModal = () => {
        setModal(!modal1);
    };

    if (modal1) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }



    // GSAP cdn for animation
    useEffect(() => {
        if (modal1) {
            gsap.from(".add-category-modal", {
                y: -50,
                duration: 0.3,
                opacity: 0,
            });
        }
    }, [modal1]);


    const useApiCall = useMutation({
        mutationKey:["POST_CATEGORY_MANAGECATEGORY"],
        mutationFn:(payload:any)=>{
            console.log(payload)
            return axios.post("http://localhost:8082/category/save",payload)
        },onSuccess: () => {
            notify();
            reset();
            refetch();
        }
    })

    const onSubmit=(value:any)=>{
        useApiCall.mutate(value)
    }


    //hitting server on port 8082
    const{register,
        handleSubmit,
        formState
        ,reset}=useForm();

    const{errors} = formState;

    // Fetching data from API
    const{data,refetch} = useQuery({
        queryKey:["GETDATA"],
        queryFn(){
            return axios.get("http://localhost:8082/category/findAll")
        }
    })

    //Searching data
    const filteredData = data?.data.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    //Deleting data
    const deleteByIdApi=useMutation(
        {
            mutationKey:["DELETE_BY_ID"],
            mutationFn(id:number){
                return axios.delete("http://localhost:8082/category/delete/"+id);
            },onSuccess(){refetch()}
        }
    )


    //Toast
    const notify = () =>toast.success('Category Inserted Successfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    });



    // Function to toggle edit modal
    const toggleEditModal = (data: any) => {
        setEditData(data); // Set data to prefill in the edit form
        setModalOpen(true);
    };

    // Form submit handler for editing
    const handleEditSubmit = async (editedData: any) => {
        try {
            await axios.put(`http://localhost:8082/category/update/${editData.id}`, editedData);
            notify(); // Notify user about successful update
            setModalOpen(false); // Close the edit modal
            refetch(); // Refetch data
        } catch (error) {
            console.error("Error updating category:", error);
            // Handle error
        }
    };

    // Form handling for editing
    const { register: editRegister, handleSubmit: handleEditSubmitForm, formState: editFormState } = useForm();
    const { errors: editErrors } = editFormState;


    return(
        <section>
            <div className={"manage-category-page"}>
                <div className={"category-left"} >
                    <AdminSidebar />
                </div>

                <div className={"category-right"}>
                    <header className={"category-header"}>
                        <h1>Manage Category</h1>

                        <div className={"search-wrapper2"}>
                            <span><FaSearch /></span>
                            <input type={"search"} placeholder={"Search Category"} value={search} onChange={(e)=> setSearch(e.target.value)}/>
                        </div>

                        <div className={"user-wrapper2"}>
                            <img src={"https://images.pexels.com/photos/14073969/pexels-photo-14073969.jpeg?auto=compress&cs=tinysrgb&w=800"} width={"40px"} height={"40px"} alt={"N"}/>
                            <div>
                                <h4>Admin</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                    </header>

                    <div className={"category-main-content"}>
                        <div className={"c-main-content"}>
                            <div className={"btn1"}>
                                <button type={"button"} onClick={toggleCatgModal}><span><FaPlus style={{fontSize:"1.5rem",marginBottom:"-1px",color:"white"}}/></span></button>
                            </div>

                            <div className={"table-container2"}>
                                <div className={"card-header2"}>
                                    <h2>Categories</h2>
                                </div>
                                <div className={"card-body2"}>
                                    <table className={"table1"}>
                                        <thead>
                                        <tr>
                                            <th className={"id-box2"}>ID</th>
                                            <th className={"name-box2"}>Category Name</th>
                                            <th className={"edit-box2"}>Edit</th>
                                            <th className={"delete-box2"}>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            filteredData?.map((i:any) =>{
                                                return(
                                                    <tr key={i?.id}>
                                                        <td>{i?.id}</td>
                                                        <td>{i?.name}</td>
                                                        <td>
                                                            <button className={"edit-btn2"} onClick={() => toggleEditModal(i)}>
                                                                <CiEdit />
                                                            </button>
                                                        </td>
                                                        <td><button className={"delete-btn2"} onClick={() => {
                                                            // Display confirmation prompt before deletion
                                                            if (window.confirm("Are you sure you want to delete this category?")) {
                                                                deleteByIdApi.mutate(i?.id);
                                                            }
                                                        }}><MdDelete /></button></td>
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



            {modal1 && (
                <div className="add-category-modal" >
                    <div onClick={toggleCatgModal} className="add-category-overlay"></div>
                    <div className="add-category-modal-content">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2>Add Category</h2>
                            <button className="close-add-category-btn"  onClick={() => {
                                toggleCatgModal();
                                reset(); // Reset the form
                            }}>
                                <FaRegWindowClose />
                            </button>

                            <div className={"category-name"}>
                                <label>Category Name</label>
                                <input type={"text"} placeholder={"Enter Category Name"} {...register("name",{required:"Category Name is required!!"})}/>
                                <h6 style={{paddingLeft:"3px"}}>{errors?.name?.message}</h6>
                            </div>
                            <div className={"category-name-add-btn"}>
                                <button type={"submit"}>Add</button>
                            </div>
                        </form>
                    </div>

                    <ToastContainer />
                </div>
            )}


            {modalOpen && (
                <div className="edit-category-modal">
                    <div className="edit-category-modal-content">
                        <form onSubmit={handleEditSubmitForm(handleEditSubmit)}>
                            <h2>Edit Category</h2>
                            <button className="close-edit-category-btn" onClick={() => setModalOpen(false)}>
                                <FaRegWindowClose />
                            </button>

                            <div className={"category-name"}>
                                <label>Category Name</label>
                                <input
                                    type={"text"}
                                    placeholder={"Enter Category Name"}
                                    defaultValue={editData.name} // Prefill category name for editing
                                    {...editRegister("name", { required: "Category Name is required!!" })}
                                />
                                <h6 style={{ paddingLeft: "3px" }}>{editErrors?.name?.message}</h6>
                            </div>
                            <div className={"category-name-add-btn"}>
                                <button type={"submit"}>Update</button>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            )}

        </section>
    );
};

export default ManageCategory;