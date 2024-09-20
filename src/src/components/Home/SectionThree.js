import React, {Fragment} from 'react'
import Slide1 from '../../img/slide1.jpg'
import Slide2 from '../../img/slide2.jpg'
import Slide3 from '../../img/slide3.jpg'
import Slide4 from '../../img/slide4.jpg'

export default function SectionThree() {
    return (
        <Fragment>
            <section id="reviews" class="py-3">
          <h1 class="lead">Reviews</h1>
          <div class="container grid-reviews">
            <div class="card">
              <img src={Slide1} class="card-img" alt="" />
    
              <a href="#" class="card-title">
                Brave privacy browser 'mistake' added affiliate links to crypto URLs
              </a>
    
              <div class="card-footer">
                <img src={Slide2} alt="" class="author-card-img" />
                <a href="#" class="author-card-name">Tom Johnson</a>
                <p class="card-date">20/12/2020</p>
              </div>
            </div>
            <div class="card">
              <img src={Slide2} class="card-img" alt="" />
    
              <a href="#" class="card-title">
                Brave privacy browser 'mistake' added affiliate links to crypto URLs
              </a>
    
              <div class="card-footer">
                <img src={Slide3} alt="" class="author-card-img" />
                <a href="#" class="author-card-name">Tom Johnson</a>
                <p class="card-date">20/12/2020</p>
              </div>
            </div>
            <div class="card">
              <img src={Slide1} class="card-img" alt="" />
    
              <a href="#" class="card-title">
                Brave privacy browser 'mistake' added affiliate links to crypto URLs
              </a>
    
              <div class="card-footer">
                <img src={Slide2} alt="" class="author-card-img" />
                <a href="#" class="author-card-name">Tom Johnson</a>
                <p class="card-date">20/12/2020</p>
              </div>
            </div>
            <div class="card">
              <img src={Slide1} class="card-img" alt="" />
    
              <a href="#" class="card-title">
                Brave privacy browser 'mistake' added affiliate links to crypto URLs
              </a>
    
              <div class="card-footer">
                <img src={Slide3} alt="" class="author-card-img" />
                <a href="#" class="author-card-name">Tom Johnson</a>
                <p class="card-date">20/12/2020</p>
              </div>
            </div>
          </div>
        </section>
        </Fragment>
    )
}
