import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../css/ProductItem.scss";

// eslint-disable-next-line react/prop-types
const ProductItem = ({ deliver, urlName }) => {
  // eslint-disable-next-line react/prop-types
  const [product, setProduct] = useState({});
  const [ProductImgs, setProductImg] = useState(deliver.ProductImgs);
  const [newIcon, setNewIcon] = useState(false);
  const [hotIcon, setHotIcon] = useState(false);

  const getAuthInfo = useSelector((state) => state);
  const [userUrl, setUserUrl] = useState();

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

        res.data >= 3 ? setHotIcon(true) : setHotIcon(false);
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
    //월별로 하는건 ?
    differ < 31 ? setNewIcon(true) : setNewIcon(false);
  }, []);

  function isFav() {
    setProduct({
      idx: deliver.Product.idx,
      title: deliver.Product.title,
      price: deliver.Product.price,
      status: deliver.status,
    });
    setProductImg(deliver.ProductImgs);
    console.log("==============", deliver.Product.title);
  }

  function notFav() {
    console.log("IM NOT FAV");
    setProduct({
      idx: deliver.idx,
      title: deliver.title,
      price: deliver.price,
      status: deliver.status,
    });
    setProductImg(deliver.ProductImgs);
  }

  return (
    <>
      <span>
        <div className="thumbnail">
          <Link to={`/${product.idx}`}>
            <img src={ProductImgs[0].imgUrl} alt="thumbnail" />
          </Link>
        </div>
        {deliver.status === "Y" ? (
          <img
            className="hot"
            src="https://thumbs.gfycat.com/AllVastIberianemeraldlizard-max-1mb.gif"
          />
        ) : (
          ""
        )}
        &nbsp;
        {newIcon ? <img className="hot" src="/icon_new.gif" /> : ""}
        &nbsp;
        {hotIcon ? <img className="hot" src="/icon_hot.gif" /> : ""}
        <div className="titleWrap">
          <span className="title">{product.title}</span>
          <span className="price_origin">{product.price}원</span>
        </div>
      </span>
    </>
  );
};

export default ProductItem;
