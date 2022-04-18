import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import ProductItem from "./ProductItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Product = () => {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/product?page=${page}`
        );
        setCards(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Row style={{ marginLeft: "5%" }}>
        {cards.map((deliver) => (
          <Col sm={12} key={deliver.idx}>
            <Card style={{ width: "18rem", marginBottom: "2rem" }}>
              <Card.Body>
                <Card.Title>
                  <ProductItem key={deliver.idx} deliver={deliver} />
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
