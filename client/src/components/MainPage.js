import React from "react";
import ControlledCarousel from "./ControlledCarousel";
import Product from "./Product";
import "../css/Main.scss";

const MainPage = () => {
  return (
    <div className="main">
      <ControlledCarousel />
      <br />
      <Product />
    </div>
  );
};

export default MainPage;
