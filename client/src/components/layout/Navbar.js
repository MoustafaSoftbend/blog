import React, {NavLink, Fragment} from 'react';

const Navbar = () => {
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
              <a href="/" className="nav-link active">Home</a>
            </li>
            <li className="nav-item">
              <a href="/post" className="nav-link">Blog</a>
            </li>
            <li className="nav-item">
              <a href="index.html" className="nav-link">About</a>
            </li>
          </ul>
        </div>
      </nav>
        </Fragment>

    )
}

export default Navbar;
