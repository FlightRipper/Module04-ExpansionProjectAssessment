import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useAuthContext } from '../hooks/useAuthContext';

const AllMemes = () => {
  const { user } = useAuthContext();
  const [product, setProduct] = useState([]);
  useEffect(() => {
      const fetchMemes = async () => {
          try {
          const response = await axios.get('http://localhost:5000/products/', {
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
      fetchMemes();
  }, []);

  return (
    <>
      <div className="DisplayAll-Container-Main bg-dark">
        <div className="DisplayAll-Title">All Products</div>
        <div className="DisplayAll-Cards-Container">
          {product && product.length > 0 ? (
            product.map((product) => (
              <Card
                key={product.id}
                image={`http://localhost:5000/uploads/${product.image}`}
                description={product.description}
                categroy={product.categorey}
                title={product.title}
                memeId={product.id}
              />
            ))
          ) : (
            <p className="DisplayAll-Title">No Products available</p>
          )}
        </div>
      </div>  
    </>
  );
}

export default AllMemes;