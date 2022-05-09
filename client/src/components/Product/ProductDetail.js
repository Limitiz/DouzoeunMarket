import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { MdAutoFixHigh } from "react-icons/md";
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
import CommentModal from "./CommentModal.js";

function ProductDetail() {
  const getAuthInfo = useSelector((state) => state);
  const [product, setProduct] = useState({});
  const [commonList, setCommonList] = useState();
  const [cName, setCName] = useState("");
  const [seller, setSeller] = useState("");
  const [like, setLike] = useState(false);
  const [btn, setBtn] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [sold, setSold] = useState();

  const { id } = useParams();
  const userId = !!getAuthInfo ? getAuthInfo.user.idx : "";
  const email = !!getAuthInfo ? getAuthInfo.user.email : "";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/product/detail`,
          { id: id, userId: userId }
        );
        //좋아요 확인
        let commonInfo = res.data[0];
        let productInfo = res.data[1];
        console.log(productInfo);

        setProduct(productInfo);
        setCommonList(commonInfo);
        setCName(productInfo.Category.name);
        setSeller(productInfo.User.nickName);
        setLike(!productInfo.Favorite);
        setSold(productInfo.status);

        console.log(
          "userId" +
            userId +
            ", seller" +
            productInfo.seller +
            ", buyer" +
            productInfo.buyer
        );
        if (userId === productInfo.seller) {
          setBtn("edit");
          console.log("edit HERE");
        } else if (productInfo.Order !== null) {
          setBtn("comment");
          console.log("comment HERE");
        } else {
          setBtn("pay");
          console.log("pay HERE");
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchProduct();
  }, []);

  const clickPay = () => {
    if (email === "") {
      alert("로그인 이후에 결제하실 수 있습니다!");
    }
  };

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
          <Link to="/">
            <div className="homeIcon">
              <i className="fa-solid fa-house"></i>
            </div>
          </Link>
          &nbsp;
          <Link to="/">
            <p className="home">홈</p>
          </Link>
          &nbsp;&nbsp;
          <div>
            <i className="arrow fa-solid fa-arrow-right"></i>
          </div>
          &nbsp;&nbsp;
          <Link to="/">
            <p className="categoryItem">{cName}</p>
          </Link>
        </div>
        <hr style={{ marginTop: "-5px", border: 0, height: "1px" }} />
        <div className="productContainer">
          <div className="carouselwidth">
            <DetailCarousel deliver={product} />
          </div>
          {sold === "N" ? (
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

                {btn === "pay" ? (
                  <Link to={`/${id}/${email}`}>
                    <Button
                      className="pay"
                      onClick={() => {
                        clickPay();
                      }}
                    >
                      <SiKakao className="kakao" />
                      &nbsp;pay
                    </Button>
                  </Link>
                ) : btn === "edit" ? (
                  <Link to="/">
                    <Button className="pay">
                      <MdAutoFixHigh className="fix" />
                      &nbsp;글&nbsp;수정하기
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button className="pay" onClick={() => setModalShow(true)}>
                      <MdAutoFixHigh className="AiFillStar" />
                      &nbsp;거래후기&nbsp;작성
                    </Button>
                    {modalShow && (
                      <CommentModal
                        show={modalShow}
                        setModalShow={setModalShow}
                        onHide={() => setModalShow(false)}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div
              className="productInfo"
              style={{ textAlign: "center", padding: "30px" }}
            >
              <img
                src="https://thumbs.gfycat.com/AllVastIberianemeraldlizard-max-1mb.gif"
                style={{ width: "50%" }}
              />
              <h4>이미 판매된 상품입니다.</h4>
            </div>
          )}
        </div>
      </div>
      <Tabs defaultActiveKey="MyProduct" className="mb-5">
        <Tab eventKey="MyProduct" title={`상품 정보`}>
          <div className="productContent">
            <div>
              <div>{seller} 판매자의 상품설명</div>
              <hr />
              <div>"{product.content}"</div>
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
