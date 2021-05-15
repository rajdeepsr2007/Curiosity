import React, { Component} from 'react';
import './App.css';
import { BrowserRouter , Route } from 'react-router-dom';
import Auth from './containers/Auth/auth';

import {connect} from 'react-redux';

class App extends Component {
  render() {

    let routes;

    if( this.props.auth ){
      routes = (
        <Switch>
          <Route path="/user/edit-topics" exact render={Auth} />
        </Switch>
      )
    }else{
      routes = (
        <Switch>
          <Route path="/auth" exact render={Auth} />
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
    auth : state.auth.token !== null
  }
}

export default connect(mapStateToProps)(App);
