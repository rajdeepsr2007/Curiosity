import React , { Component} from 'react';
import Login from './Login/login';
import Signup from './Signup/signup';
import classes from './auth.module.css';
import Logo from '../../components/UI/Logo/logo';
import {Button} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/MailOutlineRounded'
import ArrowBack from '@material-ui/icons/ArrowBack'

class Auth extends Component{

    state={
        //Tells the mode of Auth page whether to login or signup
        isLogin : true
    }

    switchAuthModeHandler = () => {
        this.setState( ( prevState , props ) => {
            return {
                prevState ,
                isLogin : !prevState.isLogin
            }
        } )
    }

    render(){
        let content = this.state.isLogin ? <Login /> : <Signup />
        const formContainerClass = this.state.isLogin ? classes.inputs : classes.inputs_signup ;

        return (
            <div className={classes.align} >
                <div className={classes.auth} >
                    <div className={classes.info} >
                        {/*About website*/}
                    </div>
                    <div className={classes.form} >
                        <Logo />
                        <div className={formContainerClass} >
                            {content}
                            <div className={classes.button} >
                                <Button variant="outlined" onClick={this.switchAuthModeHandler} >
                                    {this.state.isLogin ? <EmailIcon /> : <ArrowBack />}
                                    {this.state.isLogin ? 
                                    <span style={{ marginLeft : '5px' }} > Signup With Email</span> 
                                    : <span style={{ marginLeft : '5px' }} > Switch To Login</span>}
                                </Button>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        )
    }
}

export default Auth;