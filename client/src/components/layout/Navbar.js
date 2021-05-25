import React, {NavLink, Fragment, useEffect, PropTypes} from 'react';

const Navbar = ({tab}) => {

    return(
        <Fragment>
          <nav id="navbar">
            <div className="nav-container">
              <a href="/" className="nav-logo">Viral Tech</a>
              <a href="#" className="hamburger-menu"
                ><i className="fa fa-bars fa-2x"></i
              ></a>

              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="/" className={`nav-link ${tab=='index'? 'active': ''}`}>Home</a>
                </li>
                <li className="nav-item">
                  <a href="/post" className={`nav-link ${tab=='post' ? 'active': ''}`}>Blog</a>
                </li>
                <li className="nav-item">
                  <a href="/about" className={`nav-link ${tab=='about'? 'active': ''}`}>About</a>
                </li>
              </ul>
            </div>
          </nav>
        </Fragment>

    )
    Navbar.propTypes = {
  tab: PropTypes.string.isRequired
  }

}


export default Navbar;
