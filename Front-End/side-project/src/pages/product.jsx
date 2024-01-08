import {React, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext';
import "./product.css";

const ProductPage = () => {
    const { user } = useAuthContext();
    const { memeId } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        console.log(memeId)
        const fetchProducts = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/products/${memeId}/product`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            });
            const data = response.data;
            setProduct(data);
            console.log(data);
            } catch (error) {
            console.log(error);
            setProduct(null);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className="product-single">
            <img src={product.image} className="image-product" />
        </div>
    )
}

export default ProductPage;