import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/product/${id}`
        );
        setProduct(data.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="Container">
      <br />
      <hr />
      <div className="categoryBox">
        <i className="fa-solid fa-house"></i>
        <p className="home">홈</p>
        <i className="fa-solid fa-arrow-right"></i>
        <p className="categoryItem">{product.name}</p>
      </div>
      <hr style={{ border: 0, height: "2px" }} />
      <div className="productContainer">
        <img src={product.imgUrl} alt="thumbnail" className="productImage" />
        <div>
          <p className="pTitle">{product.title}</p>
          <p className="pPrice">{product.price}원</p>
          <hr />
          <p className="content">{product.content}</p>
          <hr />
          <ul>
            <li className="productState">
              상품상태
              <span className="state">중고</span>
            </li>
            <li className="productState">
              거래지역
              <i className="fa-solid fa-location-dot"></i>
              <span className="state">전국</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
