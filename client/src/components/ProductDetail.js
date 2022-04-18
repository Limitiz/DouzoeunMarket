import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await axios.get(
          `http://localhost:8000/product/${id}`
        );
        setProduct(data.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.price}</p>
    </div>
  );
}

export default ProductDetail;
