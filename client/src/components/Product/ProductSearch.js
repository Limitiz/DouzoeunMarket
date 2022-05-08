import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Product from "./Product";
import "../../css/ProductSearch.scss";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const ProductSearch = () => {
  // eslint-disable-next-line react/prop-types
  const location = useLocation();

  let { title } = useParams();

  title = location.state.title;

  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       `http://localhost:8000/product/search?search=${location.state.title}`
  //     );
  //     console.log(res.data);
  //   };

  useEffect(() => {
    console.log(title);
  }, [title]);

  return (
    <div className="ProductSearch">
      <Product url={`product/search/${title}`} />
    </div>
  );
};

export default ProductSearch;
