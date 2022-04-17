import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
function App() {
  const base_url = process.env.REACT_APP_BASE_URL;

  // const callApi = () => {
  //   axios.get(`${base_url}/main`).then((res) => console.log(res.data));
  // };

  // useEffect(() => {
  //   callApi();
  // }, []);

  return (
    <>
      <Header />
      <Routes>
        {/* <a href={`${base_url}/login`}>로그인하러가기</a>
        <br /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
