import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import Navbar from "./navbar/Navbar.tsx";
import "../css/postProduct.css";

const PostProduct: React.FC = () => {
    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;

    const useApiCall = useMutation({
        mutationKey: ["POST_PRODUCT_DATA"],
        mutationFn: async (payload: any) => {
            try {
                const response = await axios.post(
                    "http://localhost:8082/product/save",
                    payload
                );
                return response.data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            console.log("Successful")
            reset();
        },
    });

    const { data: categories } = useQuery({
        queryKey: ["GET_CATEGORIES"],
        queryFn: () => axios.get("http://localhost:8082/category/findAll"),
    });

    const { data: subCategories } = useQuery({
        queryKey: ["GET_SUBCATEGORIES"],
        queryFn: () => axios.get("http://localhost:8082/subCategory/findAll"),
    });

    // Function to get userId from local storage
    const getUserIdFromLocalStorage = () => {
        const userId = localStorage.getItem('userId');
        return userId;
    };

    useEffect(() => {
        // Fetch userId from local storage
        const userId = getUserIdFromLocalStorage();
        if (userId) {
            // You may want to do something with the userId here
            console.log('UserId fetched from local storage:', userId);
        } else {
            console.log('UserId not found in local storage');
        }
    }, []); // Empty dependency array ensures this effect runs only once during component initialization

    const onSubmit = (value: any) => {
        const uid = getUserIdFromLocalStorage();
        console.log('I am sending UID:', uid);
        console.log(value);
        const fd = new FormData();
        fd.append("userId", uid);
        fd.append("productName", value?.productName);
        fd.append("productBrand", value?.productBrand);
        fd.append("price", value?.price);
        fd.append("address", value?.address);
        fd.append("categoryId", value?.categoryId);
        fd.append("subCategoryId", value?.subCategoryId);
        fd.append("productCondition", value?.productCondition);
        fd.append("productDiscription", value?.productDiscription);
        fd.append("phone", value?.phone);
        fd.append("productImage", value?.productImage[0]);
        useApiCall.mutate(fd);
    }

    return (
        <>
            <div className="navbar-div">
                <Navbar />
            </div>
            <div className="main-div">
                <form className="form-div" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-box">
                        <div className="input-group">
                            <div className="select-Category">
                                <select id="category-option" {...register("categoryId", { required: true })}>
                                    <option>Select a Category</option>
                                    {categories &&
                                        categories.data.map((category: any) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="select-subCategory">
                                <select id="SubCategory-option" {...register("subCategoryId", { required: true })}>
                                    <option>Select a SubCategory</option>
                                    {subCategories &&
                                        subCategories.data.map((subCategory: any) => (
                                            <option key={subCategory.id} value={subCategory.id}>
                                                {subCategory.subCategoryName}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Product Name" {...register("productName", { required: "Product Name is required!" })} />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Product Brand" {...register("productBrand", { required: "Product Brand is required!" })} />
                        </div>

                        <div className="input-group">
                            <select {...register("productCondition", { required: "Product Condition is required!" })}>
                                <option value="">Select Product Condition</option>
                                <option value="Brand New">Brand New</option>
                                <option value="Like New">Like New</option>
                                <option value="Used">Used</option>
                                <option value="Not-Working">Not-Working</option>
                            </select>
                        </div>


                        <div className="input-group">
                            <input type="text" placeholder="Price" {...register("price", { required: "Price is required!" })} />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Address" {...register("address", { required: "Address is required!" })} />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Product Description" {...register("productDiscription", { required: "Product Description is required!" })} />
                        </div>

                        <div className="input-group">
                            <input type="text" placeholder="Phone" {...register("phone", { required: "Phone number is required!" })} />
                        </div>

                        <div className="input-group">
                            <input type="file" placeholder="Add Image" {...register("productImage", { required: "Product image is required!" })} />
                        </div>


                    </div>
                    <div className="submit-btn">
                        <button type="submit">Post</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PostProduct;
