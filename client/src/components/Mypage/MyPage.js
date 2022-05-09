import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import Profile from "./Profile";
import Product from "../Product/Product";
import Comment from "../Mypage/Comment";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MyPage() {
  const[num, setNum] = useState([0,0,0,0]);

  const getAuthInfo = useSelector((state) => state);
  const { userId } = useParams();

  useEffect(() => {
    async function number() {
      const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/mypage/num/${userId}`
      );
      setNum(res.data);
    }

    number();
  }, []);

  const auth = async () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/isAuth`;
  };

  if (getAuthInfo) {
    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <Profile />

        <Tabs defaultActiveKey="MyProduct" className="mb-5">
          <Tab eventKey="MyProduct" title={`나의 상품 목록 (${num[0]})`}>
            <Product url={`mypage/product/${userId}`} />
          </Tab>
          <Tab eventKey="MyFavorite" title={`찜 목록 (${num[1]})`}>
            <Product url={`mypage/favorite/${userId}`} />
          </Tab>
          <Tab eventKey="MyReview" title={`거래 후기 (${num[2]})`}>
            <Comment />
          </Tab>
          <Tab eventKey="MyOrder" title={`나의 주문 목록 (${num[3]})`}>
            <Product url={`mypage/order/${userId}`} />
          </Tab>
        </Tabs>
      </div>
    );
  } else {
    auth();
  }
}
