import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    font-size: 16px;
  }
  .price_origin {
    color: gray;
    font-size: 13px;
  }
`;

// eslint-disable-next-line react/prop-types
const ProductItem = ({ deliver }) => {
  // eslint-disable-next-line react/prop-types
  const { idx, ProductImgs, title, price } = deliver;
  return (
    <Container>
      <span>
        <div className="thumbnail">
          <Link to={`/${idx}`}>
            <img src={ProductImgs[0].imgUrl} alt="thumbnail" />
          </Link>
        </div>
        <span className="title">{title}</span>
        <br />
        <span className="price_origin">{price}원</span>
      </span>
    </Container>
  );
};

export default ProductItem;
