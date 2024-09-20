import React, {Link, Fragment, useEffect} from 'react';
import Carousel from './Carousel';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree'
import SectionFour from './SectionFour'
import SectionZero from './SectionZero';
import SectionFive from './SectionFive';

import {connect, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchPosts} from "../../redux/actions/PostsAction"
import SliderFunction from '../../utils/SliderFunction'





const Home = ({fetchPosts}) => {

  useEffect(() => {
    fetchPosts()
    // SliderFunction()
  }, [])
    return(
      <Fragment>
        <Carousel />
        <SectionZero />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
      </Fragment>

    )
}

Home.propTypes = {
};





export default connect(null, {fetchPosts})(Home);