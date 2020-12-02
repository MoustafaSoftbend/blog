import React, {Link, Fragment} from 'react';
import Navbar from '../layout/Navbar'


const Footer = () => {
    return(
        <Fragment>
    <section id="carousel" className="carousel">
     <Navbar />
      <div className="carousel-viewport">
        <div className="carousel-slide" id="slide1">
          <img id="1" className="slide-img" src="./img/chip.jpg" alt="" />
          <div className="overlay"></div>
          <div className="slider-container">
            <a href="#" className="slider-title">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit,
              voluptatibus.
            </a>
            <p className="slide-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>

          </div>
        </div>
        <div className="carousel-slide" id="slide2">
          <img id="2" className="slide-img" src="./img/desktop.jpg" alt="" />
          <div className="overlay"></div>
          <div className="slider-container">
            <a href="#" className="slider-title">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit,
              voluptatibus.
            </a>
            <p className="slide-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="carousel-slide" id="slide3">
          <img id="3" className="slide-img" src="./img/motherboard.jpg" alt="" />
          <div className="overlay"></div>
          <div className="slider-container">
            <a href="#" className="slider-title">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit,
              voluptatibus.
            </a>
            <p className="slide-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="carousel-slide" id="slide4">
          <img id="4" className="slide-img" src="./img/phones.jpg" alt="" />
          <div className="overlay"></div>
          <div className="slider-container">
            <a href="#" className="slider-title">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit,
              voluptatibus.
            </a>
            <p className="slide-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
      <a href="#" className="navigation"><span></span></a>
    </section>
        </Fragment>

    )
}

export default Footer;