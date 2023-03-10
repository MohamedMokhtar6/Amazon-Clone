import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "./Slider";
import land1 from "../Images/slid1.jpg";
import land3 from "../Images/slid3.png";
import land2 from "../Images/slid2.jpg";
import Product from "./Product";
import img1 from "../Images/pro1.png";
import img2 from "../Images/pro2.png";
import img3 from "../Images/pro3.png";
import img4 from "../Images/pro4.png";
import img5 from "../Images/pro5.png";
import shortid from "shortid";

function Home() {
  return (
    <>
      <Row className="mb-5 m-0">
        <Slider img1={land1} img2={land2} img3={land3} />
      </Row>
      <Container>
        <Row xs={"1"} md="2">
          <Col>
            <Product
              id={shortid.generate()}
              title="Lenovo - Legion 5 - Gaming Laptop - AMD Ryzen 7 5800H - 16GB RAM - 512GB Storage - NVIDIA GeForce RTX 3050Ti - 15.6 FHD Display - Windows 11 Home - Phantom Blue"
              price="1000"
              rate="4"
              img={img1}
            />
          </Col>
          <Col>
            <Product
              id={shortid.generate()}
              title="Apple iPhone 11 Pro, US Version, 512GB, Space Gray - Unlocked "
              price="1200"
              rate="4"
              img={img2}
            />
          </Col>
        </Row>
        <Row xs={"1"} md="3">
          <Col>
            <Product
              id={shortid.generate()}
              title="SAMSUNG 980 PRO SSD 2TB PCIe NVMe Gen 4 Gaming M.2 Internal Solid State Drive Memory Card, Maximum Speed, Thermal Control, MZ-V8P2T0B"
              price="3500"
              rate="4"
              img={img3}
            />
          </Col>
          <Col>
            <Product
              id={shortid.generate()}
              title="Razer Basilisk V3 Customizable Ergonomic Gaming Mouse: Fastest Gaming Mouse Switch - Chroma RGB Lighting - 26K DPI Optical Sensor - 11 Programmable Buttons - HyperScroll Tilt Wheel - Classic Black "
              price="1400"
              rate="4"
              img={img4}
            />
          </Col>
          <Col>
            <Product
              id={shortid.generate()}
              title="Bedtime Originals Twinkle Toes Pink Elephant Plush, Hazel, 1 Count (Pack of 1)"
              price="350"
              rate="2"
              img={img5}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
