import './App.css';
import {Fragment,Router} from 'react';
import Carousel from './components/Home/Carousel' 
import Footer from './components/layout/Footer'; 
function App() {
  return (
    <Fragment>
      <Carousel />
      <Footer />
    </Fragment>
  );
}

export default App;
