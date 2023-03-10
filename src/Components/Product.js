import React from "react";
import { Button, Row } from "react-bootstrap";
import { useAuth } from "../Context/GlobalState";

function Product(props) {
  const { dispatch, user } = useAuth();
  const addToCart = () => {
    if (user) {
      dispatch({
        type: "Add_To_Cart",
        item: {
          id: props.id,
          title: props.title,
          rate: props.rate,
          price: props.price,
          img: props.img,
        },
      });
    } else {
      alert("You Must Sign In First");
    }
  };
  return (
    <Row className="p-2 product m-2 bg-white">
      <Row>{props.title}</Row>
      <Row>{props.price} EGP</Row>
      <Row>
        {Array(props.rate)
          .fill()
          .map((_, i) => (
            <p>
              {props.rate}
              <i className="fa-solid fa-star gold mx-1"></i>
            </p>
          ))}
      </Row>
      <Row className="justify-content-center">
        <img
          src={props.img}
          alt="product"
          style={{ width: "12em", height: "10em" }}
        />
      </Row>
      <Row>
        <Button
          className="bg-orange text-black mx-auto fit my-2"
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </Row>
    </Row>
  );
}

export default Product;
