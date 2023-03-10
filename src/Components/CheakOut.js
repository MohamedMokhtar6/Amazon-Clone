import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../Context/GlobalState";
import ad from "../Images/ad.jpg";
import Item from "./Item";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Context/AppReducer";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const navigate = useNavigate();
  const { user, basket } = useAuth();
  return (
    <>
      <Container className="d-flex justify-content-center ">
        <Row className="justify-content-between my-2">
          <Row className="justify-content-center my-2">
            <Col xs="6">
              <span className="fit">Hello {user?.email}</span>
            </Col>
            <Col
              xs="6"
              className="bg-white p-4 d-flex justify-content-center flex-column  align-items-center fit"
            >
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <p>
                      Subtotal ({basket.length} items): <span>{value}</span>
                    </p>
                  </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandsSeparator={true}
                prefix={"$"}
              />
              <Row className="my-1 align-items-end">
                <input type={"checkbox"} className="fit" />
                <span className="fit">This Order Contain a Gift</span>
              </Row>
              <Row>
                <Button
                  className="fit bg-orange text-black mx-auto"
                  onClick={() => {
                    navigate("/payment");
                  }}
                >
                  Proceed to CheckOut
                </Button>
              </Row>
            </Col>
          </Row>
          <Col sm="12">
            <p className="m-4 fw-bold fs-3">Your Shopping Cart</p>
            <Row>
              {basket.length > 0 ? (
                basket.map((item, i) => {
                  return (
                    <Item
                      price={item.price}
                      rate={item.rate}
                      title={item.title}
                      img={item.img}
                      id={item.id}
                    />
                  );
                })
              ) : (
                <h1>Your Cart Is Empty</h1>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CheckOut;
