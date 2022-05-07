import React from "react";
import "../../css/Success.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function Success() {
  const params = new URLSearchParams(window.location.search);
  const { id } = useParams();
  let token = params.get("pg_token");
  const [result, setResult] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/kPay/success`,
          { token: token, id: id }
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    if (token) setResult("결제완료");
    else setResult("결제실패");
  }, []);
  return (
    <div className="success">
      {result === "결제완료" ? (
        <img src="https://assets.materialup.com/uploads/9ba2d687-d7d3-4361-8aee-7b2a3c074761/preview.gif"></img>
      ) : (
        <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif"></img>
      )}

      <div>
        <h2>{result}</h2>
        <Link to="/">
          <h2>메인화면으로 이동</h2>
        </Link>
      </div>
    </div>
  );
}
