import React, {Fragment} from 'react'
import Slide1 from '../../img/slide1.jpg'
import Slide2 from '../../img/slide2.jpg'
import Slide3 from '../../img/slide3.jpg'
import Slide4 from '../../img/slide4.jpg'

export default function SectionFour() {
    return (
        <Fragment>
          <section id="categories-grid">
            <div class="container">
              <h1 class="lead">Categories</h1>
              <hr/>
              <div class="first-category-grid-div">
                <img src={Slide1} alt="" class="first-category-grid-img" />
                <div class="first-category-grid-content">
                  <a href="#" class="first-category-grid-title">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</a>
                  <p class="first-category-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem commodi culpa repellat provident? Accusantium.</p>
                </div>
              </div>
              <div class="categories-grid-container">
                <div class="category-grid-div">
                  <img src={Slide2} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia vitae numquam, eius fugit cupiditate minima maxime ducimus minus obcaecati quaerat!</p>
                  </div>
                </div>
                <div class="category-grid-div">
                  <img src={Slide3} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
                <div class="category-grid-div">
                  <img src={Slide4} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
                <div class="category-grid-div">
                  <img src={Slide1} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
                <div class="category-grid-div">
                  <img src={Slide2} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
              </div>
              <div class="first-category-grid-div">
                <img src={Slide3} alt="" class="first-category-grid-img" />
                <div class="first-category-grid-content">
                  <a href="#" class="first-category-grid-title">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</a>
                  <p class="first-category-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem commodi culpa repellat provident? Accusantium.</p>
                </div>
              </div>
              <div class="categories-grid-container">
                <div class="category-grid-div">
                  <img src={Slide4} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia vitae numquam, eius fugit cupiditate minima maxime ducimus minus obcaecati quaerat!</p>
                  </div>
                </div>
                <div class="category-grid-div">
                  <img src={Slide1} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
                <div class="category-grid-div">
                  <img src={Slide2} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
                <div class="category-grid-div">
                  <img src={Slide3} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
                <div class="category-grid-div">
                  <img src={Slide4} alt="" class="category-grid-img" />
                  <div class="category-grid-content">
                    <a href="#" class="category-grid-title">Lorem ipsum dolor sit amet consectetur,</a>
                    <p class="category-text">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                  </div>
                </div>
              </div>
              <div class="more-subjects">
                <hr/>
                <button class="btn btn-more">Explore More</button>
              </div>
            </div>
          </section>
        </Fragment>
           
    )
}
