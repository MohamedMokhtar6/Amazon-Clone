import React from "react";
import { Carousel } from "react-bootstrap";

function Slider({ img1, img2, img3 }) {
  return (
    <Carousel className="p-4  click" style={{ height: "20em" }} fade>
      <Carousel.Item>
        <img
          className="d-block w-100 reduce "
          style={{ height: "20em" }}
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 reduce "
          style={{ height: "20em" }}
          src={img2}
          alt="Second slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 reduce"
          style={{ height: "20em" }}
          src={img3}
          alt="Third slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
