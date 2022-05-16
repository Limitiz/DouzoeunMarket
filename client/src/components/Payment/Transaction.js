import React from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../css/Transaction.scss";
import "../../css/Main.scss";
import PointModal from "./PointModal";
import DaumPost from "./DaumPost";

export default function Transaction() {
  //2
  const getAuthInfo = useSelector((state) => state);
  const { id } = useParams();
  const { email } = useParams();
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const [prod, setProd] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [point, setPoint] = useState();
  const [seller, setSeller] = useState();
  const prodPrice = parseInt(prod.price) + 2500;
  const [totalPrice, setTotalPrice] = useState();
  const [chk, setChk] = useState(false);
  const [addrDetail, setAddrDetail] = useState();

  const [transForm, setTransForm] = useState({
    cid: "TC0ONETIME", // 테스트 코드
    partner_order_id: "731392",
    partner_user_id: getAuthInfo.user.idx,
    item_name: 0,
    quantity: 1,
    total_amount: 0,
    vat_amount: 0,
    tax_free_amount: 0,
    approval_url: `${process.env.REACT_APP_CLIENT_URL}/success/${id}`,
    fail_url: `${process.env.REACT_APP_CLIENT_URL}/success/${id}`,
    cancel_url: `${process.env.REACT_APP_CLIENT_URL}/success/${id}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/product/pay/${id}/${email}`
        );

        console.log(response.data);
        setImgUrl(response.data[2].ProductImgs[0].imgUrl);
        setList(response.data[0]);
        setUser(response.data[1]);
        setAddress(response.data[1].address);
        setProd(response.data[2]);
        setTransForm({
          ...transForm,
          item_name: response.data[2].title,
          total_amount: response.data[2].price,
        });
        setSeller(response.data[2].User.nickName);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setTransForm({
      ...transForm,
      total_amount: totalPrice,
    });
  }, [totalPrice]);

  const kakaoPay = async () => {
    if (chk && addrDetail && address !== "주소를 설정해놓지 않았습니다") {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/kPay`,
        transForm
      );
      console.log(transForm);
      window.location.href = res.data.next_redirect_pc_url;
    } else if (!chk) {
      alert("약관동의에 체크해주세요.");
    } else if (
      address === "주소를 설정해놓지 않았습니다" ||
      addrDetail === ""
    ) {
      alert("주소를 입력해주세요.");
    }
  };
  const onChangeModalIsOpen = (e) => {
    setModalIsOpen(true);
  };
  const commonList = list.map((list) => <li key={list.idx}>{list.Column}</li>);

  return (
    <>
      <div className="main mainPay">
        <div className="userImg">
          <img src={`/` + imgUrl}></img>
        </div>
        <div className="user_prod payInfo">
          <h3>더조은 마켓을 이용해 거래합니다.</h3>
          <hr />
          <div className="user_prod payInfo2">
            <p calssName="width20">
              <h4>{seller || "(닉네임없음)"}</h4>
              <span>님의</span>
            </p>
            <p>
              <h4>{prod.title}</h4>
              <span>상품입니다.</span>
            </p>
            <p>
              <span>가격은</span> <h4>{prod.price}</h4>
              <span>원 입니다.</span>
            </p>
          </div>
          <hr />
          <h3>상세설명</h3>
          <p>{prod.content}</p>
        </div>
      </div>
      <hr />
      <Form>
        <fieldset className="main">
          <Form.Group className="mb-3">
            <Form.Label>배송지</Form.Label>
            <div className="addr">
              <Form.Control value={address} disabled />
              <Button className="changeA" onClick={onChangeModalIsOpen}>
                변경
              </Button>
              {modalIsOpen ? (
                <DaumPost
                  modalIsOpen={true}
                  setModalIsOpen={setModalIsOpen}
                  setAddress={setAddress}
                />
              ) : (
                ""
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => {
                setAddrDetail(e.target.value);
              }}
              placeholder="상세주소입력."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>포인트</Form.Label>
            <div className="point">
              <Form.Control
                placeholder={`가용포인트는 ${user.point} 입니다.`}
                value={point}
              />
              <Button className="useP" onClick={() => setModalShow(true)}>
                사용
              </Button>
              <PointModal
                show={modalShow}
                point={user.point}
                prodPrice={prodPrice}
                setTotalPrice={setTotalPrice}
                setPoint={setPoint}
                setTransForm={setTransForm}
                setModalShow={setModalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>결제금액</Form.Label>
            <div className="list">
              <div className="list01">
                <ul>{commonList}</ul>
              </div>
              <div className="list02">
                <ul>
                  <li>{prod.price}</li>
                  <li>{prod.shippingIncluded}(2500원추가)</li>
                  <li>{prodPrice}</li>
                  <li>{point || 0}</li>
                  <li>{totalPrice || prodPrice}</li>
                </ul>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>결제수단</Form.Label>
          </Form.Group>
          <Button className="button" onClick={kakaoPay}>
            카카오페이
          </Button>
          <Form.Group className="mb-3 agree">
            <Form.Check
              value="chk"
              type="checkbox"
              label="개인정보 제 3자 제공동의와 결제대행 서비스 이용약관에 동의합니다."
              onChange={() => {
                if (!chk) {
                  setChk(true);
                } else {
                  setChk(false);
                }
              }}
            />
            <div>
              <a href="#">자세히 보기</a>
            </div>
            <div>
              “번개장터_인증폰”, “BGZT Lab 1”, “BGZT Lab 2”, “BGZT 컬렉션”
              상점의 판매상품을 제외한 모든 상품들에 대하여, 번개장터는
              통신판매중개자로서 중고거래마켓 번개장터의 거래 당사자가 아니며,
              입점판매자가 등록한 상품정보 및 거래에 대해 책임을 지지 않습니다.
            </div>
          </Form.Group>
        </fieldset>
      </Form>
    </>
  );
}
