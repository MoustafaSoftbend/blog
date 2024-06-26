import './App.css';
import {Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './redux/store' 

import Home from './components/Home/Home' 
import Post from './components/post/Post' 
import About from './components/About/About'
import Footer from './components/layout/Footer';

const App =() =>  {
  return (
    <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/post' component={Post} />
            <Route path='/about' component={About} />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
        <Footer />
    </Provider>
  );
}

export default App;
