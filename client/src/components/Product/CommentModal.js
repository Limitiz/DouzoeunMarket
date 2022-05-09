import React, { useState } from "react";
import { Modal, Container, Button } from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";

const CommentModal = (props) => {
    const [content, setContent] = useState("");
    const [rate, setRate] = useState(5);
    const {id} = useParams();

    const getAuthInfo = useSelector((state) => state);
    const userId = !!getAuthInfo ? getAuthInfo.user.idx : "";

    const sendComment = async () => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/product/comment`,
            {   id : id,
                rate : rate,
                content : content,
                writer : userId,
                receiver : props.seller
            });
    }

    const complete = () => {
        if (rate > 5) {
            alert("최대 별점은 5점 입니다.");
        } else if (rate%1 !== 0) {
            alert(`정수를 입력해주세요.`);
        } else if (rate < 0) {
            alert("0보다 큰 수를 입력해주세요.");
        } else {
            sendComment();
            props.onHide();
        }
    };

    return (
        <>
            <Modal
                show = {props.show}
                onHide={props.onHide}
                className="Modal"
                aria-labelledby="contained-modal-title-vcenter"
                onRequestClose={props.onHide}
            >
                <Modal.Header closeButton className="ModalHead"></Modal.Header>
                <Modal.Body className="show-grid ModalBody">
                    <Container>
                        <h3>후기를 남겨주세요!</h3>
                        <h4>별점</h4>
                        <input className="rating"
                            placeholder="점수 입력 (5점 만점)"
                            onChange={(e) => {
                                setRate(e.target.value);
                            }}
                        />
                        <hr />
                        <input className="comment"
                            placeholder="후기"
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                        <hr />
                        <Button className="CommentModalButton" onClick={()=>{complete()}}>
                            작성하기
                        </Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CommentModal;
