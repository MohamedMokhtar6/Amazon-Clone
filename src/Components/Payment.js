import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { Link, useNavigate } from "react-router-dom";
import { getBasketTotal } from "../Context/AppReducer";
import { useAuth } from "../Context/GlobalState";
import axios from "./Axios";
import Item from "./Item";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
function Payment() {
  const { basket, user, dispatch } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [error, setErorr] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [basket]);

  const navigate = useNavigate();
  let [id, setId] = useState("0");

  const handleChange = (e) => {
    setDisabled(e.empty);
    setErorr(error ? error.message : "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(ref, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setSucceeded(true);
        setErorr(null);
        setProcessing(false);
        navigate("/orders", { replace: true });
        dispatch({
          type: "Empty_Basket",
        });
      });
  };
  return (
    <Container>
      <Row className="mx-0 mb-5 justify-content-center ">
        <Row className="justify-content-center text-center my-2 m-0">
          <Link to={"/checkout"} className="link text-black">
            <h2>Checkout ({basket.length}item)</h2>
          </Link>
        </Row>
        <Row className="bg-white">
          <Row className="align-items-center  mb-2 m-0 p-0">
            <Col sm="2">
              <h3>Delivery Address</h3>
            </Col>
            <Col sm="10" className="d-flex flex-column p-2">
              <span>{user?.email}</span>
              <textarea
                placeholder="Your Address"
                rows={"3"}
                className="p-1"
                style={{ resize: "none" }}
              />
            </Col>
          </Row>
          <Row className="align-items-center  mb-2 borders ">
            <Col sm="2">
              <h3>Review Items</h3>
            </Col>
            <Col sm="10">
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
          <Row className="align-items-center  ">
            <Col sm="2">
              <h3>Payment Method</h3>
            </Col>
            <Col sm="10">
              <select
                className="my-2 reduce fit "
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                <option value={"0"}>Select Payment Method</option>
                <option value={"1"}>Credit Card</option>
                <option value={"2"}>Cash </option>
              </select>
              {id === "1" ? (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <CardElement onChange={handleChange} />
                  </Row>
                  <Row>
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          <p>
                            Order Total : <span>{value}</span>
                          </p>
                        </>
                      )}
                      decimalScale={2}
                      value={getBasketTotal(basket)}
                      displayType={"text"}
                      thousandsSeparator={true}
                      prefix={"$"}
                    />
                  </Row>
                  <Row>
                    <Button
                      disabled={processing || disabled || succeeded}
                      type="submit"
                      className="fit bg-orange text-black mx-auto mb-3"
                    >
                      {processing ? <p>Processing</p> : "Buy Now"}
                    </Button>
                  </Row>
                  {error && <Row>{error}</Row>}
                </form>
              ) : null}
              {id === "2" ? (
                <>
                  <Row>
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          <p>
                            Order Total : <span>{value}</span>
                          </p>
                        </>
                      )}
                      decimalScale={2}
                      value={getBasketTotal(basket)}
                      displayType={"text"}
                      thousandsSeparator={true}
                      prefix={"$"}
                    />
                  </Row>
                  <Row>
                    <Button
                      type="submit"
                      className="fit bg-orange text-black mx-auto mb-2"
                    >
                      Buy Now
                    </Button>
                  </Row>
                  {error && <Row>{error}</Row>}
                </>
              ) : null}
            </Col>
          </Row>
        </Row>
      </Row>
    </Container>
  );
}

export default Payment;
