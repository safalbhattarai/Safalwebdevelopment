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
    productDiscription: string;
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
                        Authorization: `Bearer ${userId}` // Include userId in headers
                    }
                });
                localStorage.setItem("token","login-token");
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId, userId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    console.log(product.productImage);

    return (
        <div className="product-card">
            <h2>Name: {product.productName}</h2>
            <p>Brand: {product.productBrand}</p>
            <p>Condition: {product.productCondition}</p>
            <p>Description: {product.productDiscription}</p> {/* Fixed typo here */}
            <p>Phone: {product.phone}</p> {/* Fixed typo here */}
            <p>Address: {product.address}</p>
            <p>Price: Rs.{product.price}</p>

            <div className="image-new">
                <p><img src={'data:image/jpeg;base64,' + product.productImage} width={"320px"} alt={product.productName} /></p>
            </div>
        </div>
    );
};

export default ProductCard;
