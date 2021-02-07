import React, { Fragment } from 'react'
import Slide1 from '../../img/slide1.jpg'
import Slide2 from '../../img/slide2.jpg'
import Slide3 from '../../img/slide3.jpg'
import Slide4 from '../../img/slide4.jpg'

export default function Section2() {
    return (
    <Fragment>
        <section id="related-posts">
            <div class="container">
                <h1 class="lead">You May Like</h1>
                <div class="related-posts-content">
                    <div class="card">
                        <img src={Slide1} class="card-img" alt="" />
                        <a href="#" class="card-title">
                        Brave privacy browser 'mistake' added affiliate links to crypto
                        URLs
                        </a>
                        <span class="date">18h ago</span>
                    </div>
                    <div class="card">
                        <img src={Slide2} class="card-img" alt="" />
                        <a href="#" class="card-title">
                        Brave privacy browser 'mistake' added affiliate links to crypto
                        URLs
                        </a>
                        <span class="date">18h ago</span>
                    </div>
                    <div class="card">
                        <img src={Slide3} class="card-img" alt="" />
                        <a href="#" class="card-title">
                        Brave privacy browser 'mistake' added affiliate links to crypto
                        URLs
                        </a>
                        <span class="date">18h ago</span>
                    </div>
                    <div class="card">
                        <img src={Slide4} class="card-img" alt="" />
                        <a href="#" class="card-title">
                        Brave privacy browser 'mistake' added affiliate links to crypto
                        URLs
                        </a>
                        <span class="date">18h ago</span>
                    </div>
                    <div class="card">
                        <img src={Slide1} class="card-img" alt="" />
                        <a href="#" class="card-title">
                        Brave privacy browser 'mistake' added affiliate links to crypto
                        URLs
                        </a>
                        <span class="date">18h ago</span>
                    </div>
                    <div class="card">
                        <img src={Slide2} class="card-img" alt="" />
                        <a href="#" class="card-title">
                        Brave privacy browser 'mistake' added affiliate links to crypto
                        URLs
                        </a>
                        <span class="date">18h ago</span>
                    </div>
                </div>
            </div>
        </section>
    </Fragment>


    )
}
