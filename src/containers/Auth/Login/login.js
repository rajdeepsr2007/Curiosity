import React , { Component, Fragment } from 'react';
import {TextField , Button } from '@material-ui/core';
import classes from './login.module.css';
import { checkInputValidity } from '../util/auth-util';
import Alert from '../../../components/UI/Feedback/Alert/alert'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axiosInstance from '../../../axiosInstance';

import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';
import Loader from '../../../components/UI/Loader/loader';

import { withRouter } from 'react-router';

class Login extends Component{

    state={
        controls:{
            email : {
                type : null,
                label : 'Email or Username',
                valid : false ,
                value : '',
                error : 'Please fill out this field' ,
                validation : {
                    rules : {
                        isFilled : true ,
                    }
                }
            },
            password : {
                type : 'password',
                value : '',
                label : 'Password',
                valid : false ,
                error : 'Please fill out this field' ,
                validation : {
                    rules : {
                        isPassword : true,
                        isFilled : true
                    }
                }
            }
        },
        isFormValid : false,
        showErrors : false
    }

    componentWillUnmount = () => {
        this.props.onResetSignup();
    }

    componentDidUpdate = () => {
        // console.log(this.props)
        if( this.props.auth ){
            if( this.props.firstLogin ){
                this.props.history.push('/user/edit-topics')
            }else{
                this.props.history.push('/home')
            }
        }
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        console.log('Login');
        if(!this.state.isFormValid){
            this.setState({ showErrors : true })
        }else{
            this.props.onLogin(
                this.state.controls.email.value,
                this.state.controls.password.value 
            )
        }
    }

    inputChangeHandler = (event,inputKey) => {
        this.setState( (prevState , props) => {
            let updatedControls={};
            for( const key in prevState.controls ){
                updatedControls = {
                    ...updatedControls,
                    [key] : { ...prevState.controls[key] }
                }
            }
            updatedControls[inputKey].value = event.target.value;
            updatedControls[inputKey].error = checkInputValidity( event.target.value ,  updatedControls[inputKey].validation.rules )

            let isFormValid = true;
            for( const key in updatedControls ){
                if( updatedControls[key].error ){
                    isFormValid = false;
                }
            }
            return {
                ...prevState ,
                controls : updatedControls,
                isFormValid,
                showErrors : false
            }
        } )
    }

    render(){

        const formInputs = [];
        for( let key in this.state.controls ){
            const input = this.state.controls[key];
            formInputs.push(
                <Fragment key={key} >
                    <div className={classes.input} >
                        <TextField
                        type={input.type}
                        value={input.value}
                        error={false}
                        label={input.label}
                        required
                        onChange={ (event) => this.inputChangeHandler(event,key) }
                        />
                    </div>
                    { this.state.showErrors && input.error ? <Alert alertType="error" text={input.error} /> : null }
                </Fragment>
            )
        }

        let submitButton = <div className={classes.button} >
                <Button 
                variant="contained" 
                color="primary"
                onClick={this.submitFormHandler}
                >Login</Button>
            </div>
        
        if( this.props.loading ){
            submitButton = <Loader />
        }

        const message = this.props.signup ? <Alert alertType="success" text={'You were successfully Signed up'} size="big" /> : null;

        return(
            <div className={classes.form} >
                { this.props.error ? <Alert alertType="error" size="big" text={this.props.error} /> : null }
                <form>
                    {formInputs}
                    {submitButton}
                </form>  
                {message}
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        signup : state.signup.signup,
        token : state.auth.token,
        loading : state.auth.loading,
        error : state.auth.error,
        auth : state.auth.token !== null,
        firstLogin : state.auth.firstLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetSignup : () => dispatch(actions.resetSignup()),
        onLogin : (email,password) => dispatch(actions.login(email,password))
    }
}

export default withErrorHandler(connect(mapStateToProps,mapDispatchToProps)(withRouter(Login)) , axiosInstance );