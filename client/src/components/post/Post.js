import React, { Fragment, useEffect } from 'react'
import Section1 from './Section1'
import Section2 from './Section2'
import Navbar from '../layout/Navbar'

export default function Post() {

    useEffect(() => {
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
        <Navbar tab='post' />
        <Section1 />
        <Section2 />
    </Fragment>
    )
    
}
