import React, { useState } from "react";

import { Modal, Container, Button } from "react-bootstrap";
import "../../css/Login.scss";
import Product from "../Product/Product";

const PointModal = (props) => {
  const [inputPoint, setInputPoint] = useState("");
  //const [ModalHide, setModalHide] = useState(false);
  const setPoint = props.setPoint;
  const setTotalPrice = props.setTotalPrice;
  const setModalShow = props.setModalShow;

  const complete = () => {
    if (props.point < inputPoint) {
      alert("가용포인트 만큼 입력해주셔야합니다.");
    } else if (inputPoint > props.prodPrice) {
      alert(`포인트가 결제금액보다 큽니다. (결제금액 : ${props.prodPrice})`);
    } else if (inputPoint < 0) {
      alert("0보다 큰 수를 입력해주세요.");
    } else {
      setPoint(inputPoint);
      setTotalPrice(props.prodPrice - inputPoint);
      setModalShow(false);
    }
  };

  return (
    <>
      <Modal
        {...props}
        className="Modal"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="ModalHead"></Modal.Header>
        <Modal.Body className="show-grid ModalBody">
          <Container>
            <h3>사용하실 포인트를 입력해주세요.</h3>
            <h4>사용 가능 포인트 금액 </h4>
            <h4>{props.point} Point</h4>
            <hr />
            <input
              placeholder="사용금액입력"
              onChange={(e) => {
                setInputPoint(e.target.value);
              }}
            />
            <hr />
            <Button className="PointModalButton" onClick={complete}>
              사용
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PointModal;
