import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import { SiKakao } from "react-icons/si";
import { Link, useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Location from "./Location";
import { useSelector } from "react-redux";
import DetailCarousel from "./DetailCarousel";
import QnA from "./QnA";
import "../../css/ProductDetail.scss";
import "../../css/Main.scss";

function ProductDetail() {
  const getAuthInfo = useSelector((state) => state);
  const [product, setProduct] = useState({});
  const [commonList, setCommonList] = useState();
  const [cName, setCName] = useState("");
  const [like, setLike] = useState(false);

  const { id } = useParams();
  const userId = !!getAuthInfo ? getAuthInfo.user.idx : "";
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/product/detail`,
          { id: id, userId: userId }
        );
        //좋아요 확인
        console.log(id);
        console.log(userId);
        let commonInfo = res.data[0];
        let productInfo = res.data[1];
        console.log(productInfo);
        setProduct(productInfo);
        setCommonList(commonInfo);
        setCName(productInfo.Category.name);
        setLike(!productInfo.Favorite);
        console.log(!productInfo.Favorite);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, []);

  const postProduct = async () => {
    if (userId === "") {
      alert("로그인 이후에 이용하실 수 있습니다!");
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/product/detail/postid`,
          { idx: id, userId: userId }
        );
        if (res.data === "like") {
          setLike(false);
        } else {
          setLike(true);
        }
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="productDetail main">
      <div className="Container">
        <br />
        {/* <hr /> */}
        <div className="categoryBox">
          <div>
            <Link to="/">
              <i className="fa-solid fa-house"></i>
            </Link>
          </div>
          &nbsp;
          <p className="home">
            <Link to="/">홈</Link>
          </p>
          &nbsp;&nbsp;
          <div>
            <i className="arrow fa-solid fa-arrow-right"></i>
          </div>
          &nbsp;&nbsp;
          <p className="categoryItem">
            <Link to="/">{cName}</Link>
          </p>
        </div>
        <hr style={{ marginTop: "-5px", border: 0, height: "1px" }} />
        <div className="productContainer">
          <div className="carouselwidth">
            <DetailCarousel deliver={product} />
          </div>
          <div className="productInfo">
            <p className="pTitle">{product.title}</p>
            <p className="pPrice">{product.price}원</p>
            <hr />
            <div className="common">
              <ul className="commonkey">
                {commonList ? (
                  commonList.map((item, id) => {
                    return <li key={id}>{item.Column}</li>;
                  })
                ) : (
                  <></>
                )}
              </ul>
              <ul className="commonvalue">
                <li>{product.productStatus}</li>
                <li>{product.exchange}</li>
                <li>{product.address}</li>
                <li>{product.shippingincluded}</li>
              </ul>
            </div>
            <div className="Buttons">
              <Button
                className=""
                onClick={() => {
                  postProduct();
                }}
              >
                <div>
                  {like ? (
                    <AiOutlineLike className="jjimIcon"></AiOutlineLike>
                  ) : (
                    <AiFillLike className="jjimIcon"></AiFillLike>
                  )}
                  {like ? "Unlike" : "Like"}
                </div>
              </Button>

              <Button className="pay">
                <SiKakao className="kakao" />
                &nbsp;pay
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="MyProduct" className="mb-5">
        <Tab eventKey="MyProduct" title={`상품 정보`}>
          <div className="productContent">
            <div>
              <div>{product.seller}번 판매자의 상품설명</div>
              <hr />
              <div>{product.content}</div>
            </div>
            <span className="vertical-line3" />
            <div>
              <div className="preferplace">판매자가 선호하는 거래 장소. </div>
              <div className="productmap">
                <Location deliver={product} />
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="MyFavorite" title={`상품 문의`}>
          <QnA id={id} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ProductDetail;
