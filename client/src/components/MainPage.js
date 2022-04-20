import React from "react";
import MainCarousel from "./MainCarousel";
import Product from "./Product";
import "./Main.scss";

const MainPage = () => {
  return (
    <div className="main">
      <MainCarousel />
      <br />
      <Product />
    </div>
  );
};

export default MainPage;
