import './App.css';
import {Fragment,useEffect} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async'
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom'
import Home from './components/Home/Home' 
import Post from './components/post/Post' 
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const App =() =>  {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "./script/main.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   console.log(script)
  //   script.onload = () => this.scriptLoaded();
  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, [])
  return (
    <Fragment>
        <Navbar />
        <Router>
          <Switch>
            <Route path='/post' component={Post} />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
        <Footer />
    </Fragment>
  );
}

export default App;
