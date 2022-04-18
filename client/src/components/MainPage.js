import React from "react";
import ControlledCarousel from "./ControlledCarousel";
import Product from "./Product";
import "./Main.scss";


const MainPage = () => {
  return (
    <div>
      <ControlledCarousel />
      <br />
      <Product />
    </div>
  );
};

export default MainPage;
