import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import Profile from "./Profile";
import Product from "../Product/Product";
import Comment from "../Mypage/Comment";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MyPage() {
  const [productNum, setPNum] = useState(0);
  const [favoriteNum, setFNum] = useState(0);
  const [commentNum, setCNum] = useState(0);
  const [orderNum, setONum] = useState(0);
  let pNum = "";
  let fNum = "";
  let cNum = "";
  let oNum = "";

  const getAuthInfo = useSelector((state) => state);
  const { userId } = useParams();

  useEffect(() => {
    number();
  }, []);

  async function number() {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/mypage/num/${userId}`
    );
    pNum = res.data[0];
    setPNum(pNum);
    fNum = res.data[1];
    setFNum(fNum);
    cNum = res.data[2];
    setCNum(cNum);
    oNum = res.data[3];
    setONum(oNum);
  }

  const auth = async () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/isAuth`;
  };

  if (getAuthInfo) {
    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <Profile />

        <Tabs defaultActiveKey="MyProduct" className="mb-5">
          <Tab eventKey="MyProduct" title={`나의 상품 목록 (${productNum})`}>
            <Product url={`mypage/product/${userId}`} />
          </Tab>
          <Tab eventKey="MyFavorite" title={`찜 목록 (${favoriteNum})`}>
            <Product url={`mypage/favorite/${userId}`} />
          </Tab>
          <Tab eventKey="MyReview" title={`거래 후기 (${commentNum})`}>
            <Comment />
          </Tab>
          {/* 일단 이렇게 하고 서버설정 다시 해줘야함 */}
          <Tab eventKey="MyOrder" title={`나의 주문 목록 (${orderNum})`}>
            <Product url={`mypage/order/${userId}`} />
          </Tab>
        </Tabs>
      </div>
    );
  } else {
    auth();
  }
}
