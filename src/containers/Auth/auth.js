import React , { Component, Fragment } from 'react';
import Login from './Login/login';
import Signup from './Signup/signup';

class Auth extends Component{

    state={
        //Tells the mode of Auth page whether to login or signup
        isLogin : true
    }

    render(){
        let content = this.state.isLogin ? <Login /> : <Signup />
        return (
            <Fragment>
                {content}
            </Fragment>  
        )
    }
}

export default Auth;