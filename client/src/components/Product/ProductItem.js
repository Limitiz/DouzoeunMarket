import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  .thumbnail {
    img {
      width: 8rem;
      height: 8rem;
      margin: 0;
      margin-bottom: 1rem;
    }
  }

  .title {
    display: block;
    width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .price_origin {
    color: gray;
    font-size: 13px;
  }
  .hot {
    width: 20% !important;
  }
`;

// eslint-disable-next-line react/prop-types
const ProductItem = ({ deliver, urlName }) => {
  // eslint-disable-next-line react/prop-types
  const [product, setProduct] = useState({});
  const [ProductImgs, setProductImg] = useState(deliver.ProductImgs);
  const [newIcon, setNewIcon] = useState(false);
  const [hotIcon, setHotIcon] = useState(false);
  // const ProductImgs = deliver.ProductImgs;
  // const [ProductImgs, setProductImg] = useState(deliver.ProductImgs);

  const getAuthInfo = useSelector((state) => state);
  console.log("????", deliver);
  console.log("IMG!!!!!!!!!!", ProductImgs);
  const [userUrl, setUserUrl] = useState();

  console.log("urlName : ", urlName);
  useEffect(() => {
    getAuthInfo === false ? setUserUrl("") : setUserUrl(getAuthInfo.user.idx);
    urlName === `mypage/favorite/${userUrl}` ? isFav() : notFav();

    //좋아요가 세개 이상인경우 hot icon 붙여주기
    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/product/favorite`,
          { id: deliver.idx }
        );

        res.data.length >= 3 ? setHotIcon(true) : setHotIcon(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
    //한달내의 상품일 경우 new icon 붙여주기
    var now = new Date();
    var createDate = new Date(deliver.createdAt);

    var differ = Math.ceil(
      (now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    differ < 31 ? setNewIcon(true) : setNewIcon(false);
  }, []);

  async function isFav() {
    setProduct({
      idx: deliver.Product.idx,
      title: deliver.Product.title,
      price: deliver.Product.price,
    });
    setProductImg(deliver.ProductImgs);
  }

  async function notFav() {
    setProduct({
      idx: deliver.idx,
      title: deliver.title,
      price: deliver.price,
    });
    setProductImg(deliver.ProductImgs);
  }

  return (
    <Container>
      <span>
        <div className="thumbnail">
          <Link to={`/${product.idx}`}>
            <img src={ProductImgs[0].imgUrl} alt="thumbnail" />
          </Link>
        </div>
        {newIcon ? <img className="hot" src="./icon_new.gif" /> : ""}
        &nbsp;
        {hotIcon ? <img className="hot" src="./icon_hot.gif" /> : ""}
        <div className="titleWrap">
          <span className="title">{product.title}</span>
          <span className="price_origin">{product.price}원</span>
        </div>
      </span>
    </Container>
  );
};

export default ProductItem;
