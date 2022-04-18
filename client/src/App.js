import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";

function App() {
  const base_url = process.env.REACT_APP_BASE_URL;
  // const callApi = () => {
  //   axios.get(`${base_url}/main`).then((res) => console.log(res.data));
  // };

  // useEffect(() => {
  //   callApi();
  // }, []);

  return (
    <div>
      {/* <a href={`${base_url}/login`}>로그인하러가기</a> */}
      <Header />
      <br />
      <div className="main">
        <MainPage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
