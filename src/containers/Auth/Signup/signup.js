import React , { Component } from 'react';
import {TextField , Button } from '@material-ui/core';
import Alert from '../../../components/UI/Feedback/Alert/alert'
import classes from './signup.module.css';
import {checkInputValidity} from '../util/auth-util';

import {connect} from 'react-redux';

import Loader from '../../../components/UI/Loader/loader'

import * as signupActions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axiosInstance from '../../../axiosInstance';

class Signup extends Component{

    state={
        controls : {
            email : {
                type : null,
                label : 'Email',
                value : '',
                valid : false,
                error : 'Please fill out this field' ,
                success : false,
                validation : {
                    rules : {
                        isFilled : true ,
                        isEmail : true
                    }
                }
            },
            username : {
                type : null,
                label : 'Username',
                value : '',
                valid : false,
                error : 'Please fill out this field' ,
                success : false,
                validation : {
                    rules : {
                        isFilled : true 
                    }
                }
            },
            password : {
                type : 'password',
                label : 'Password',
                value : '',
                error : 'Please fill out this field' ,
                validation : {
                    rules : {
                        isFilled : true,
                        passwordStrength: true
                    }
                }
            },
            confirm_password : {
                type : 'password',
                label : 'Confirm Password',
                value : '',
                success : false,
                error : null ,
                validation : {
                    rules : {
                        
                    }
                }
            },
        },
        isFormValid : false ,
        showErrors : false
    }

    componentDidUpdate = () => {
        if( this.props.signup ){
            this.props.changeAuthMode();
        }
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        //console.log('Signup');

        if( !this.state.isFormValid ){
            this.setState({ showErrors : true })
        }else{
            this.props.onSignup( 
                this.state.controls.email.value ,
                this.state.controls.username.value,
                this.state.controls.password.value );
        }
    }

    inputChangeHandler = (event,inputKey) => {
        let updatedControls = {};
        this.setState( ( prevState , props) => {
            for( let key in prevState.controls ){
                updatedControls = {
                    ...updatedControls,
                    [key] : {...prevState.controls[key]}
                }
            }
            updatedControls[inputKey].value = event.target.value ;
            updatedControls[inputKey].error = checkInputValidity(event.target.value , updatedControls[inputKey].validation.rules) 

            if( inputKey === 'confirm_password' ){
                
                if( updatedControls['password'].value !== event.target.value ){
                    updatedControls[inputKey].error = "Doesn't match password"
                    updatedControls[inputKey].success = null;
                }else{
                    updatedControls[inputKey].success = 'Passwords did match';
                    updatedControls[inputKey].error = null;
                }
            }
            if( inputKey === 'password' ){
                if( updatedControls['confirm_password'].value !== event.target.value ){
                    updatedControls['confirm_password'].error = "Doesn't match password"
                    updatedControls['confirm_password'].success = null;
                }else{
                    updatedControls['confirm_password'].success = 'Passwords did match';
                    updatedControls['confirm_password'].error = null;
                }
            }

            let isFormValid = true;
            for( let key in updatedControls){
                if( updatedControls[key].error){
                    isFormValid = false;
                }
            }

            return {
                ...prevState ,
                controls : updatedControls ,
                isFormValid ,
                showErrors : false
            }

        } )
    }

    render(){

        const formInputs = [];
        for( let key in this.state.controls ){
            const input = this.state.controls[key];
            formInputs.push(
                <div className={classes.input_container} key={key}>
                    <div className={classes.input}>
                        <TextField
                        type={input.type}
                        value={input.value}
                        error={false}
                        label={input.label}
                        required
                        onChange={(event) => this.inputChangeHandler(event,key)}
                        />
                    </div><br></br>
                    {   input.success ? <Alert alertType="success" text={input.success} /> : null  }
                    {
                         this.state.showErrors && input.error ?
                         <Alert alertType="error" text={input.error} />
                         :null
                    }
                    
                </div>
            )
        }

        let submitButton = <div className={classes.button} >
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.submitFormHandler}
                    >SignUp</Button>
                </div>

        if( this.props.loading ){
            submitButton = <Loader />
        }

        return (
            <div className={classes.form} >
                <form>
                    { this.props.error ? <Alert alertType="error" size="big" text={this.props.error} /> : null }
                    {formInputs}
                    {submitButton}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading : state.signup.loading ,
        error : state.signup.error,
        signup : state.signup.signup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup : (email,username,password) => dispatch(signupActions.signUp(email,username,password)),
    }
}

export default connect( mapStateToProps , mapDispatchToProps)(withErrorHandler(Signup,axiosInstance));