import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Order from "./Order";
import { useAuth } from "../Context/GlobalState";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "orders");
      const orderRef = query(collRef, orderBy("created", "desc"));
      onSnapshot(orderRef, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Container>
      <Row>
        <h2>Your Orders</h2>
      </Row>
      <Row>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </Row>
    </Container>
  );
}

export default Orders;
