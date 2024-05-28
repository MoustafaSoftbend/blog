import React, { Fragment } from 'react'
import image from '../../img/phones.jpg'


function Section1() {
    return (
        <Fragment>
            <section id="about-section">
                <div className= "container">
                    <div className="about-card">
                        <img src={image} className="about-card-img" />
                        <div className="about-card-body">
                            <h1 className="lead">About Us</h1>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, voluptatibus voluptatum dolor minima quibusdam nostrum, reiciendis ducimus suscipit quaerat adipisci a atque cum provident odio dolores error cumque porro libero itaque obcaecati nulla praesentium commodi enim delectus. Maxime repudiandae vel, facere distinctio maiores molestias accusantium exercitationem. Unde porro dicta quisquam et, id minus optio adipisci ipsa quas consequuntur ut eligendi.

                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Section1
