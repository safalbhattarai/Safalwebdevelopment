import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8082/product/findAll');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="category-list-container">
            <h2 style={{ color: 'black' }}>All Products</h2>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product.id} productId={product.id} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
