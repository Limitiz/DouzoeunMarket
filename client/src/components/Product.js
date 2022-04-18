import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Card from "react-bootstrap/Card";
import axios from "axios";
import ProductItem from "./ProductItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Product = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView();

  const fetchData = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/product?page=${page}`)
      .then((res) => {
        //console.log(res.data);
        setCards((prevState) => [...prevState, ...res.data]);
      });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 마지막 페이지를 보고 있고 로딩중이 아니라면
  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_SERVER_BASE_URL}/product?page=${page}`
  //       );
  //       setCards(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <Row style={{ marginLeft: "5%" }}>
        {cards.map((deliver) => (
          <Col sm={12} key={deliver.idx}>
            <Card style={{ width: "18rem", marginBottom: "2rem" }}>
              <Card.Body>
                <Card.Title>
                  {cards.length === deliver.idx ? (
                    <ProductItem
                      key={deliver.idx}
                      deliver={deliver}
                      ref={ref}
                    />
                  ) : (
                    <ProductItem key={deliver.idx} deliver={deliver} />
                  )}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Product;
