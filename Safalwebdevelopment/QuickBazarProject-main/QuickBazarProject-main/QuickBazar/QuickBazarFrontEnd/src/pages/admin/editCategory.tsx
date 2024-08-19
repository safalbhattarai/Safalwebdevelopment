import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../../css/editCategory.css";
import AdminSidebar from "./adminSidebar.tsx";

const EditCategory = () => {
    const navigate = useNavigate();
    const { pk_id } = useParams();

    const { data: getByIdApi } = useQuery({
        queryKey: ["GET_BY_ID_CATEGORY_API", pk_id], // Ensure pk_id is included in queryKey
        queryFn() {
            return axios.get(`http://localhost:8082/category/findById/${pk_id}`);
        },
        enabled: !!pk_id,
    });

    const useApiCall = useMutation({
        mutationKey: ["PUT_CATEGORY_MANAGECATEGORY"],
        mutationFn: (payload) => {
            console.log(payload);
            return axios.put(
                `http://localhost:8082/category/update/${pk_id}`, // Corrected URL for port 8082
                payload
            );
        },
        onSuccess: () => {
            notify();
            navigate("/ManageCategory");
        },
    });

    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: getByIdApi?.data,
    });

    const { errors } = formState;

    const onSubmit = (value) => {
        useApiCall.mutate(value);
    };

    //Toast
    const notify = () =>
        toast.success("Category Updated Successfully", {
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    return (
        <>
            <AdminSidebar />
            <div className="edit-category-modal">
                <div className="edit-category-modal-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Edit Category</h2>

                        <div className={"category-id-number"}>
                            <label>ID: {pk_id}</label>
                        </div>
                        <div className={"category-name2"}>
                            <label>Category Name</label>
                            <input
                                type={"text"}
                                placeholder={"Enter Category Name"}
                                {...register("name", { required: "Category Name is required!!" })}
                            />
                            <h6 style={{ paddingLeft: "3px" }}>{errors?.name?.message}</h6>
                        </div>
                        <div className={"category-name-add-btn2"}>
                            <button type={"submit"}>Update</button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default EditCategory;
