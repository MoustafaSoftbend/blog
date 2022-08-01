import React, {Fragment, Link, useEffect, useLayoutEffect} from 'react';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types'
import Slide1 from '../../img/slide1.jpg'
import Slide2 from '../../img/slide2.jpg'
import Slide3 from '../../img/slide3.jpg'
import Slide4 from '../../img/slide4.jpg'
import Navbar from '../layout/Navbar'
import { fetchPosts } from '../../redux/actions/PostsAction';
import SliderFunction from '../../utils/SliderFunction'

  const Carousel = ({fetchPosts, Posts}) => {

  useEffect(() => {
    if (Object.keys(Posts).length ==0){
      fetchPosts()
    }

    if  ((Object.keys(Posts).length) > 0) {
    console.log('slide!!!')
    SliderFunction()
    }


  }, [Posts])
    return (
      <Fragment>
        <section id="carousel" className="carousel">
        <Navbar tab={"index"} />
          <div className="carousel-viewport">
            {Posts.forEach((post,index) =>{
                document.querySelector(".carousel-viewport").innerHTML +=`
                          <div class="carousel-slide" id="slide${index}">
                            <img id="${index}" class="slide-img" src=${Slide1} alt="" />
                            <div class="overlay"></div>
                              <div class="slider-container">
                                <a href="#" class="slider-title">
                                  ${post.title}.
                                </a>
                                <p class="slide-body">
                                  ${post.content}
                                </p>
                              </div>
                            </div>
                          </div>
                      `;

            })}

              {/* <div className="carousel-slide" id="slide2">
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
              </div> */}
          </div>
          <a href="#" className="navigation"><span></span></a>
        </section>
      </Fragment>

    )
}

const mapStateToProps = state => ({
  Posts: state.Posts.posts_carousel,
})

Carousel.propTypes = {
  Posts: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {fetchPosts})(Carousel);
