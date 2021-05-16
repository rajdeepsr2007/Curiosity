import React, { Component} from 'react';
import './App.css';
import { BrowserRouter , Redirect, Route , Switch } from 'react-router-dom';
import Auth from './containers/Auth/auth';
import Topics from './containers/Topics/topics';

import {connect} from 'react-redux';

class App extends Component {
  render() {

    let routes;

    if( this.props.auth ){
      routes = (
        <Switch>
          <Route path="/user/edit-topics" exact component={Topics} />
          <Route path="/auth" exact component={Auth} />
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

export default connect(mapStateToProps)(App);
