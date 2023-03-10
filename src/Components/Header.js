import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/GlobalState";
import { auth } from "../Firebase";
import logo from "../Images/logo.png";

function Header() {
  const handleAuth = () => {
    auth.signOut();
  };
  const { user, basket } = useAuth();
  return (
    <>
      <Row className="bg-main p-2 align-items-center m-0 ">
        <Col className="d-flex  align-items-center mx-3 gap-4">
          <Link to={"/"} className="link fit">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <Col className="d-flex">
            <input
              type={"text"}
              placeholder="Search Amazon"
              className="search p-1"
            />
            <i className="fa-solid fa-magnifying-glass bg-orange fit  p-2 click"></i>
          </Col>
        </Col>

        <Col className=" flex-grow-0 nowrap">
          <Link to={!user && "/login"} className="link ">
            <div className="d-flex flex-column" onClick={handleAuth}>
              <span className="font-small">
                Hello {user ? user.email : "Guest"}
              </span>
              <span className="font-small">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
        </Col>
        <Col className="flex-grow-0 nowrap">
          <Link to={"/orders"} className="link d-flex flex-column">
            <span className=" font-small ">Returns</span>
            <span className="font-small">& Orders</span>
          </Link>
        </Col>
        <Col className=" flex-grow-0 nowrap mx-2">
          <Link to={"/checkout"} className="link">
            <span className="orange mx-1">{basket?.length}</span>
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Header;
