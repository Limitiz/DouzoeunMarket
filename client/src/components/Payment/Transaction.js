import React from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../css/Transaction.scss";
import "../../css/Main.scss";

export default function Transaction() {
  const { id } = useParams();
  const { email } = useParams();
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const [prod, setProd] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/product/pay/${id}/${email}`
        );
        console.log(response.data);
        setList(response.data[0]);
        setUser(response.data[1]);
        setProd(response.data[2]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const commonList = list.map((list) => <li key={list.idx}>{list.Column}</li>);
  return (
    <>
      <div className="userImg">
        <img src={user.img}></img>
      </div>
      <div className="user_prod">
        <p>{user.nickName}</p>
        <p>{prod.title}</p>
        <p>{prod.content}</p>
      </div>
      <hr />
      <Form className="main">
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label>배송지</Form.Label>
            <div className="addr">
              <Form.Control />
              <Button className="changeA">변경</Button>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select>
              <option></option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>포인트</Form.Label>
            <div className="point">
              <Form.Control value="0" />
              <Button className="useP">전액사용</Button>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>결제금액</Form.Label>
            <div className="list">
              <ul>{commonList}</ul>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>결제수단</Form.Label>
          </Form.Group>
          <Button type="submit" className="button">
            카카오페이
          </Button>
          <Form.Group className="mb-3 agree">
            <Form.Check
              type="checkbox"
              label="개인정보 제 3자 제공동의와 결제대행 서비스 이용약관에 동의합니다."
            />
            <div>
              <a href="#">자세히 보기</a>
            </div>
            <div>
              “번개장터_인증폰”, “BGZT Lab 1”, “BGZT Lab 2”, “BGZT 컬렉션”
              상점의 판매상품을 제외한 모든 상품들에 대하여, 번개장터㈜는
              통신판매중개자로서 중고거래마켓 번개장터의 거래 당사자가 아니며,
              입점판매자가 등록한 상품정보 및 거래에 대해 책임을 지지 않습니다.
            </div>
          </Form.Group>
        </fieldset>
      </Form>
    </>
  );
}
