import React, { Component} from 'react';
import './App.css';
import { BrowserRouter , Redirect, Route , Switch } from 'react-router-dom';
import Auth from './containers/Auth/auth';
import Topics from './containers/Edit/Topics/topics';

import {connect} from 'react-redux';

//import Layout from './components/Layout/layout';
import Home from './containers/Home/home';

import * as actions from './store/actions/index';
import Picture from './containers/Edit/Picture/picture';

import Layout from './hoc/Layout/layout';
import Space from './containers/Space/space';
import Question from './containers/Question/question';
import AnswerQuestion from './containers/Answer/Answer Question/answer-question';
import Following from './containers/Following/following';
import Answer from './containers/Answer/answer';
import User from './containers/User Profile/user-profile';
import Description from './containers/Edit/Description/description';
import Polls from './containers/Polls/polls';
import Logout from './containers/Auth/Logout/logout';

class App extends Component {

  componentDidMount = () => {
    this.props.onAutoLogin();
  }

  render() {

    let routes;

    if( this.props.auth ){
      routes = (
        <Switch>
          <Route path="/polls" component={Polls} />
          <Route path="/auth/logout" component={Logout} />
          <Route path="/following" component={Following} />
          <Route path="/answer/:id" component={AnswerQuestion} />
          <Route path="/answer" component={Answer} />
          <Route path="/question" component={Question} />
          <Route path="/spaces" component={Space} />
          <Route path="/home" exact component={Home} />
          <Route path="/user/edit-topics" exact component={Topics} />
          <Route path="/user/edit-picture" exact component={Picture} />
          <Route path="/user/edit-description" exact component={Description} />
          <Route path="/user/:id" component={User} />
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
        <Layout user={this.props.user} >
          {routes}
        </Layout>     
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return{
    auth : state.auth.token,
    user : state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAutoLogin : () => dispatch(actions.loginAuto())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
