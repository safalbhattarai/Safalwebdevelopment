import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/productCard.css";

interface Product {
    id: number;
    subCategoryId: number;
    categoryId: number;
    productName: string;
    productBrand: string;
    productCondition: string;
    price: string;
    address: string;
    productDescription: string;
    phone: string;
    productImage: string;
}

interface ProductCardProps {
    productId: number;
    userId: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ productId, userId }) => {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/product/findById/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${userId}`
                    }
                });
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId, userId]);

    const handleDelete = async () => {
        // Show confirmation dialog
        const confirmed = window.confirm('Are you sure you want to delete this product?');

        // If user confirms deletion
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8082/product/delete/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${userId}`
                    }
                });
                // Optionally, you can update the UI after successful deletion
                setProduct(null);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };


    if (!product) {
        return null; // If the product is deleted or not found, don't render anything
    }

    return (
        <div className="product-card">
            <h2>Name: {product.productName}</h2>
            <p>Brand: {product.productBrand}</p>
            <p>Condition: {product.productCondition}</p>
            <p>Description: {product.productDescription}</p>
            <p>Phone: {product.phone}</p>
            <p>Address: {product.address}</p>
            <p>Price: Rs.{product.price}</p>
            <div className="image-new">
                <img src={'data:image/jpeg;base64,' + product.productImage} width={"320px"} alt={product.productName} />
            </div>
            <button onClick={handleDelete}>Delete</button> {/* Add delete button with onClick handler */}
        </div>
    );
};

export default ProductCard;
