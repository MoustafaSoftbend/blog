import React, {Fragment, useEffect} from 'react'
import Section1 from './Section1'
import Navbar from '../layout/Navbar'

function About() {
    useEffect(()=> {
        const hamburger = document.querySelector('.hamburger-menu');
        const navbar = document.querySelector("#navbar");
        const nav_list = document.querySelector('.navbar-nav'); 

        navbar.style.background = "#000";
        
        if (hamburger){
          hamburger.addEventListener('click', function() {
            hamburger.style.display = 'none'
            nav_list.style.transition = "all 0.5s";
            nav_list.style.transform = "translateX(-10%)";
          })
  
        }
    }, [])
    return (
      <Fragment>
        <Navbar tab='about' />
        <Section1 />
      </Fragment>

    )
}

export default About
