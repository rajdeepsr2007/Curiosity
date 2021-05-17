import React, { Component} from 'react';
import './App.css';
import { BrowserRouter , Redirect, Route , Switch } from 'react-router-dom';
import Auth from './containers/Auth/auth';
import Topics from './containers/Topics/topics';

import {connect} from 'react-redux';

//import Layout from './components/Layout/layout';
import Home from './containers/Home/home';

import * as actions from './store/actions/index';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import axiosInstance from './axiosInstance';

class App extends Component {

  componentDidMount = () => {
    this.props.onAutoLogin();
  }

  render() {

    let routes;

    if( this.props.auth ){
      routes = (
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/user/edit-topics" exact component={Topics} />
          <Route path="/auth" exact component={Auth} />
          <Redirect to="/home" />
        </Switch>
      )
    }else{
      routes = (
        <Switch>
            <Route path="/auth" exact component={Auth} />
            <Redirect to="/auth" />
        </Switch>
      )
    }

    return (
      <BrowserRouter>
          {routes}     
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return{
    auth : state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAutoLogin : () => dispatch(actions.loginAuto())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
