import React , { Component, Fragment } from 'react';
import {InputBase, TextField , Button ,Chip } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error'
import classes from './login.module.css';

class Login extends Component{

    state={
        controls:{
            email : {
                type : null,
                label : 'Email or Username',
                value : '',
                valid : false ,
                error : 'Please fill out this field' ,
                validation : {
                    rules : {
                        isEmail : true ,
                        isUnique : true
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
                        isPassword : true
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
            updatedControls[inputKey].valid = updatedControls[inputKey].value!=='';
            updatedControls[inputKey].error =  updatedControls[inputKey].valid ? null : 'Please Fill this field';

            let isFormValid = true;
            for( const key in this.state.controls ){
                if( !updatedControls[key].valid ){
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
                <Fragment>
                    <div className={classes.input} key={key} >
                        <TextField
                        type={input.type}
                        value={input.value}
                        error={false}
                        label={input.label}
                        onChange={ (event) => this.inputChangeHandler(event,key) }
                        />
                    </div>
                    { this.state.showErrors && input.error ? 
                        <Chip
                            icon={<ErrorIcon />}
                            label={input.error}
                            color="secondary"
                            variant="outlined"
                        />:
                    null }
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