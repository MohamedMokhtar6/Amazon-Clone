import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useAuth } from "../Context/GlobalState";

function Item(props) {
  const { dispatch } = useAuth();
  const removeToCart = () => {
    dispatch({
      type: "Remove_From_Basket",
      id: props.id,
    });
  };

  return (
    <Row className="bg-white my-2 p-2 w-100 g-1 ">
      <Col sm="2" className="d-flex align-items-center justify-content-center">
        <img
          src={props.img}
          alt="product"
          style={{ maxHeight: "8em", maxWidth: "20em" }}
        />
      </Col>
      <Col sm="10">
        <Row>
          <span>{props.title}</span>
        </Row>
        <Row>
          <span>{props.price} EGP</span>
        </Row>
        <Row className="align-items-center">
          <span className="fit">
            {props.rate}
            <i className="fa-solid fa-star gold mx-1 fit"></i>
          </span>
        </Row>
        {!props.hide ? (
          <Row>
            <Button
              className="bg-orange text-black mx-auto fit my-2"
              onClick={removeToCart}
            >
              Remove from Cart
            </Button>
          </Row>
        ) : null}
      </Col>
    </Row>
  );
}

export default Item;
