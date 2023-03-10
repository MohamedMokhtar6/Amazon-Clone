import React from "react";
import { Row } from "react-bootstrap";
import moment from "moment/moment";
import Item from "./Item";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <>
      <Row>
        <Row>
          <h2>Order</h2>
        </Row>
        <Row>
          <p>{moment.unix(order.data.created).format("MMM Do YYYY h:mma")}</p>
        </Row>
        <Row>
          <p>{order.id}</p>
        </Row>
        {order.data.basket?.map((item) => (
          <Item
            price={item.price}
            rate={item.rate}
            title={item.title}
            img={item.img}
            id={item.id}
            hide={"true"}
          />
        ))}
        <Row>
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p className="bg-white fit mx-auto">
                  Order Total: <span>{value}</span>
                </p>
              </>
            )}
            decimalScale={2}
            value={order.data.amount / 100}
            displayType={"text"}
            thousandsSeparator={true}
            prefix={"$"}
          />
        </Row>
      </Row>
    </>
  );
}

export default Order;
