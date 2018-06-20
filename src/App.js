import React, { Component } from 'react';
import Home from './pages/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
    	<Router>
    		<Route path="/index" component={Home}></Route>
    	</Router>
    );
  }
}

export default App;
