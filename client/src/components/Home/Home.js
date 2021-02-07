import React, {Link, Fragment, useEffect} from 'react';
import Carousel from './Carousel';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree'
import SectionFour from './SectionFour'



const Home = () => {
    return(
      <Fragment>
        <Carousel />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </Fragment>

    )
}

export default Home;