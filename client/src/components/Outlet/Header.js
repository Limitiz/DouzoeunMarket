import React from "react";
import "../../css/Header.scss";
import Login from "../Payment/Login";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";

const Header = () => {
  const getAuthInfo = useSelector((state) => state);
  const [modalShow, setModalShow] = useState(false);
  const [loginTitle, setLoginTitle] = useState("로그인/회원가입");
  useEffect(() => {
    getAuthInfo.isTrue
      ? setLoginTitle("로그아웃")
      : setLoginTitle("로그인/회원가입");
  }, []);
  const logout = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/logout`;
  };

  return (
    <header>
      <div className="logo-container">
        <img src="logo.png" alt="douzoeunLogo" className="logo"></img>
        <div className="theme">Dou-Zoeun 마켓</div>
      </div>
      <div className="search-container">
        <input className="searchBox" type="text" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="menu-container">
        <div>판매하기</div>
        <span className="vertical-line2"></span>
        <div>내상점</div>
        <span className="vertical-line2"></span>
        <div>좋은톡</div>
        <span className="vertical-line2"></span>
        <div
          onClick={() => {
            setModalShow(!getAuthInfo.isTrue);
            getAuthInfo.isTrue ? logout() : setModalShow(true);
          }}
        >
          {loginTitle}
        </div>
        <Login show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </header>
  );
};

export default Header;
