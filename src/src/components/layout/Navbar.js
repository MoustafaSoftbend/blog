import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Correctly import NavLink from react-router-dom
import PropTypes from 'prop-types';

const Navbar = ({ tab }) => {
  return (
    <Fragment>
      <nav id="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo">Viral Tech</a>
          <a href="#" className="hamburger-menu">
            <i className="fa fa-bars fa-2x"></i>
          </a>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className={`nav-link ${tab === 'index' ? 'active' : ''}`}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/post" className={`nav-link ${tab === 'post' ? 'active' : ''}`}>Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={`nav-link ${tab === 'about' ? 'active' : ''}`}>About</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

// Define prop types outside the component
Navbar.propTypes = {
  tab: PropTypes.string.isRequired
};

export default Navbar;
