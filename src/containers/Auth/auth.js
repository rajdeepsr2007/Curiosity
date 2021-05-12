import React , { Component, Fragment } from 'react';
import Login from './Login/login';
import Signup from './Signup/signup';
import classes from './auth.module.css';
import Logo from '../../components/UI/Logo/logo';

class Auth extends Component{

    state={
        //Tells the mode of Auth page whether to login or signup
        isLogin : true
    }

    render(){
        let content = this.state.isLogin ? <Login /> : <Signup />

        return (
            <div className={classes.align} >
                <div className={classes.auth} >
                    <div className={classes.info} >
                        {/*About website*/}
                    </div>
                    <div className={classes.form} >
                        <div className={classes.inputs} >
                            <Logo />
                            {content}
                        </div>
                    </div>
               </div>
            </div>
        )
    }
}

export default Auth;