import React, { useState, useRef, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../../css/ProductForm.scss";
import ImgList from "../Payment/ImgList";
import DaumPost from "../Payment/DaumPost";

function ProductForm() {
  const count = useRef(0);
  const infoRef = useRef(null);

  //이미지외 입력 객체
  const [texts, setTexts] = useState({
    title: "", // 제목
    category1: "", //카테고리 1
    category2: "", // 카테고리 2
    category3: "", // 카테고리 3
    address: "", // 주소
    productStatus: "", // 상품상태 : 중고(1), 새상품(2)
    exchangEable: "", // 교환 : 불가(0), 가능(1)
    price: "", // 가격
    shippingIncluded: "0", // 비송비 : 미포함(0), 포함(1)
    description: "", // 설명
    imgs: [], // 이미지 배열
  });

  //previewImgs는 이미지 객체 ex) [ {Img객체 , Img객체}]
  //Img = { id, imageData }
  const [previewImgs, setPreviewImgs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    setTexts({
      ...texts,
      address: address,
    });
  }, [address]);

  //
  const insertImg = (e) => {
    let reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const Img = {
        id: count.current,
        ImgData: reader.result,
      };
      if (Img) {
        setPreviewImgs([...previewImgs, Img]);
      }
      count.current += 1;
    };
  };

  //
  const onRemove = (id) => {
    setPreviewImgs(previewImgs.filter((previewImg) => previewImg.id !== id));
  };

  //
  const onChange = (e) => {
    const { name, value } = e.target;
    setTexts({
      ...texts,
      [name]: value,
    });
  };

  //
  const onChangeModalIsOpen = (e) => {
    setModalIsOpen(true);
  };

  //
  function final(e) {
    const name = "imgs";
    const value = [...previewImgs];
    setTexts({
      ...texts,
      [name]: value,
    });
  }

  return (
    <Form encType="multipart/form-data" action="#" method="#">
      <Form.Group className="mb-3" controlId="form1">
        <Form.Label className="label">상품이미지</Form.Label>
        <br />
        <Form.Text className="text-muted">
          사진은 최대 10장까지 선택 가능합니다
        </Form.Text>
        <ImgList previewImgs={previewImgs} onRemove={onRemove} />
        {previewImgs.length < 10 ? (
          <Form.Control
            type="file"
            onChange={(e) => insertImg(e)}
            accept="image/*"
          />
        ) : (
          alert("사진은 최대 10개 까지 가능합니다")
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="form2">
        <Form.Label className="label">제목</Form.Label>
        <Form.Control
          type="text"
          placeholder="제목"
          name="title"
          onChange={onChange}
        />
        <Form.Text className="text-muted">
          한글자 이상 40글자 이내로 작성해주세요
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="form3">
        <Form.Label className="label">카테고리</Form.Label>
        <br />
        <select
          size="4"
          className="category"
          name="category1"
          onChange={onChange}
        >
          <option value="1">아메리카노</option>
          <option value="2">카페라테</option>
          <option value="3">카페오레</option>
          <option value="4">에스프레소</option>
        </select>
        <select
          size="4"
          className="category"
          name="category2"
          onChange={onChange}
        >
          <option value="11">아메리카노</option>
          <option value="22">카페라테</option>
          <option value="33">카페오레</option>
          <option value="44">에스프레소</option>
        </select>
        <select
          size="4"
          className="category"
          name="category3"
          onChange={onChange}
        >
          <option value="111">아메리카노</option>
          <option value="222">카페라테</option>
          <option value="333">카페오레</option>
          <option value="444">에스프레소</option>
        </select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="form4">
        <Form.Label className="label">거래지역</Form.Label>
        <br />
        <Button variant="primary" type="#">
          우리집
        </Button>
        &nbsp;
        <Button variant="primary" onClick={onChangeModalIsOpen}>
          직접입력
        </Button>
        <br />
        <br />
        {modalIsOpen ? (
          <DaumPost
            modalIsOpen={true}
            setModalIsOpen={setModalIsOpen}
            setAddress={setAddress}
          />
        ) : (
          ""
        )}
        <Form.Control
          type="text"
          placeholder="주소가 여기에 표시됩니다"
          name="address"
          value={address}
          //onChange={onChange}
          ref={infoRef}
          readOnly
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form5">
        <Form.Label className="label">상태</Form.Label>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3" onChange={onChange}>
            <Form.Check
              inline
              label="중고상품"
              name="productStatus"
              value="1"
              type={type}
              id={`form5-1`}
            />
            <Form.Check
              inline
              label="새상품"
              name="productStatus"
              value="2"
              type={type}
              id={`form5-2`}
            />
          </div>
        ))}
      </Form.Group>
      <Form.Group className="mb-3" controlId="form6">
        <Form.Label className="label">교환</Form.Label>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3" onChange={onChange}>
            <Form.Check
              inline
              label="교환불가"
              name="exchangEable"
              value="0"
              type={type}
              id={`form6-1`}
            />
            <Form.Check
              inline
              label="교환가능"
              name="exchangEable"
              value="1"
              type={type}
              id={`form6-2`}
            />
          </div>
        ))}
      </Form.Group>

      <Form.Group className="mb-3" controlId="form7">
        <Form.Label className="label">가격</Form.Label>
        <Form.Control
          type="number"
          placeholder="숫자만 입력해주세요."
          name="price"
          onChange={onChange}
        />
        {["checkbox"].map((type) => (
          <div
            key={`default-${type}`}
            className="mb-3"
            name="shippingIncluded"
            onChange={onChange}
          >
            <Form.Check
              type={type}
              id={`form7`}
              name="shippingIncluded"
              value={texts.shippingIncluded === "0" ? 1 : 0}
              label={`배송비 포함`}
            />
          </div>
        ))}
      </Form.Group>

      <Form.Group className="mb-3" controlId="form8">
        <Form.Label className="label">설명</Form.Label>
        <FloatingLabel
          controlId="floatingTextarea2"
          label="상품 설명을 입력해주세요.(10글자 이상)"
        >
          <Form.Control
            as="textarea"
            placeholder="상품 설명을 입력해주세요"
            style={{ height: "100px" }}
            name="description"
            onChange={onChange}
          />
        </FloatingLabel>
      </Form.Group>

      <Button variant="primary" onClick={final} type="submit">
        등록
      </Button>
    </Form>
  );
}

export default React.memo(ProductForm);
