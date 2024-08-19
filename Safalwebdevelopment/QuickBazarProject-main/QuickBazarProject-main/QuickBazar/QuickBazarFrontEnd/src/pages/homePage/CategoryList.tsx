import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/categoryList.css";

import AllProduct from "./AllProduct.tsx";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8082/category/findAll');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8082/product/findAll');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching all products:', error);
            }
        };

        fetchCategories();
        fetchAllProducts();
    }, []);

    const handleCategorySelect = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:8082/subCategory/findByCategoryId/${categoryId}`);
            setSubcategories(response.data);
            setSelectedCategoryId(categoryId);
            setSelectedSubCategoryId(null); // Clear selected subcategory
        } catch (error) {
            console.error('Error fetching subcategories by category:', error);
        }
    };

    const handleSubcategorySelect = async (subCategoryId) => {
        try {
            const response = await axios.get(`http://localhost:8082/product/findBySubCategoryId/${subCategoryId}`);
            setProducts(response.data);
            setSelectedSubCategoryId(subCategoryId);
        } catch (error) {
            console.error('Error fetching products by subcategory:', error);
        }
    };

    const handleShowAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8082/product/findAll');
            setProducts(response.data);
            setSelectedCategoryId(null); // Clear selected category
            setSelectedSubCategoryId(null); // Clear selected subcategory
        } catch (error) {
            console.error('Error fetching all products:', error);
        }
    };

    return (
        <div className="category-list-container">
            <div>
                <h2 style={{ color: 'black' }}>Categories</h2>
                <ul className="category-list">
                    {categories.map(category => (
                        <li className="category-item" key={category.id}>
                            <button className="category-link" onClick={() => handleCategorySelect(category.id)}>{category.name}</button>
                            {selectedCategoryId === category.id && (
                                <select value={selectedSubCategoryId} onChange={(e) => handleSubcategorySelect(e.target.value)}>
                                    <option value={null}>Select Subcategory</option>
                                    {subcategories.map(subCategory => (
                                        <option key={subCategory.id} value={subCategory.id}>{subCategory.subCategoryName}</option>
                                    ))}
                                </select>
                            )}
                        </li>
                    ))}
                </ul>
                <button className="all-product" onClick={handleShowAllProducts}>All Products</button>
            </div>
            <div className="product-list">
                {products.map(product => (
                    <AllProduct key={product.id} productId={product.id} />
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
