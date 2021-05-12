import React, { Component, Fragment } from 'react';
import './App.css';
import Logo from './components/UI/Logo/logo';
import Auth from './containers/Auth/auth';

class App extends Component {
  render() {
    return (
      <Auth />
    );
  }
}

export default App;
