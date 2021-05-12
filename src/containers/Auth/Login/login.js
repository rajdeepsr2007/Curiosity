import React , { Component, Fragment } from 'react';
import {TextField , Button ,Chip } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error'
import classes from './login.module.css';
import { checkInputValidity } from '../util/auth-util';
import Alert from '../../../components/UI/Feedback/Alert/alert'

class Login extends Component{

    state={
        controls:{
            email : {
                type : null,
                label : 'Email or Username',
                valid : false ,
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

    submitFormHandler = (event) => {
        event.preventDefault();
        console.log('Login');
        if(!this.state.isFormValid){
            this.setState({ showErrors : true })
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

        const submitButton = <div className={classes.button} >
                <Button 
                variant="contained" 
                color="primary"
                onClick={this.submitFormHandler}
                >Login</Button>
            </div>

        return(
            <div className={classes.form} >
                <form>
                    {formInputs}
                    {submitButton}
                </form>  
            </div>
            
        )
    }
}

export default Login;