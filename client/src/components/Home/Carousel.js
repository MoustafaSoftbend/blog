import React, {Fragment, Link} from 'react';
import Slide1 from '../../img/slide1.jpg'
import Slide2 from '../../img/slide2.jpg'
import Slide3 from '../../img/slide3.jpg'
import Slide4 from '../../img/slide4.jpg'
import Navbar from '../layout/Navbar'

const Carousel = () => {
    return (
        <Fragment>
    <section id="carousel" className="carousel">
     <Navbar tab={"index"} />
      <div className="carousel-viewport">
        <div className="carousel-slide" id="slide1">
          <img id="1" className="slide-img" src={Slide1} alt="" />
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
          <img id="2" className="slide-img" src={Slide2} alt="" />
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
          <img id="3" className="slide-img" src={Slide3} alt="" />
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
          <img id="4" className="slide-img" src={Slide4} alt="" />
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

export default Carousel;