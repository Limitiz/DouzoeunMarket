import React, { useState } from "react";
import { Modal, Container, Button } from "react-bootstrap";

const CommentModal = (props) => {
    const [content, setContent] = useState("감사합니다");
    const setModalShow = props.setModalShow;
    console.log("MODAL POPUP SHOW");

    return (
        <>
            <Modal
                isOpen = {props.show}
                className="Modal"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton className="ModalHead"></Modal.Header>
                <Modal.Body className="show-grid ModalBody">
                    <Container>
                        <h3>후기를 남겨주세요!</h3>
                        <h4>별점</h4>
                        <hr />
                        <input
                            placeholder="후기"
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                        <hr />
                        <Button className="PointModalButton" onClick={props.onHide}>
                            작성하기
                        </Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CommentModal;
