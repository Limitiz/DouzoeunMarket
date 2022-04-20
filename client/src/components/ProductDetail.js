import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Location from "./Location";
import DetailCarousel from "./DetailCarousel";
import "./ProductDetail.css";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("something...");
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/product/${id}`
        );
        setProduct(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, [id]);

  const postProduct = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/product/postid`,
        { idx: id }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="productDetail">
      <div className="Container">
        <br />
        <hr />
        <div className="categoryBox">
          <i className="fa-solid fa-house"></i>
          <p className="home">홈</p>
          <i className="fa-solid fa-arrow-right"></i>
          <p className="categoryItem">카테고리 이름</p>
        </div>
        <hr style={{ marginTop: "-5px", border: 0, height: "1px" }} />
        <div className="productContainer">
          <DetailCarousel deliver={product} />
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
            &nbsp;&nbsp;
            <Button
              onClick={() => {
                postProduct();
              }}
              variant="secondary"
            >
              찜하기
            </Button>{" "}
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="MyProduct" className="mb-5">
        <Tab eventKey="MyProduct" title={`거래 지역`}>
          <Location />
        </Tab>
        <Tab eventKey="MyFavorite" title={`상품 문의`}>
          <span>상품 문의</span>
        </Tab>
      </Tabs>
    </div>
  );
}

export default ProductDetail;
