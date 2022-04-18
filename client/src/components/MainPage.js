import React from "react";
import ControlledCarousel from "./ControlledCarousel";
import Product from "./Product";
import "./Main.scss";
const MainPage = () => {
  return (
    <>
      <ControlledCarousel />
      <br />
      <Product />
    </>
  );
};

export default MainPage;
