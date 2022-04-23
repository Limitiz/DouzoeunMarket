import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Transaction from "./components/Transaction";
import { useSelector } from "react-redux";
import MyPage from "./components/MyPage";
import "./App.css";

function App() {
  const getsomething = useSelector((state) => state);
  console.log(getsomething);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/pay" element={<Transaction />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
