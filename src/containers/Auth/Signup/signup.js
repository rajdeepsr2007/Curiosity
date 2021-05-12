import React , { Component , Fragment } from 'react';
import {TextField , Button ,Chip } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error'
import classes from './signup.module.css';

class Signup extends Component{

    state={
        controls : {
            email : {
                type : null,
                label : 'Email',
                value : '',
                valid : false,
                error : 'Please fill out this field' ,
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
                        isFilled : true
                    }
                }
            },
            confirm_password : {
                type : 'password',
                label : 'Confirm Password',
                value : '',
                error : 'Please fill out this field' ,
                validation : {
                    rules : {
                        isFilled : true
                    }
                }
            },
        },
        isFormValid : false ,
        showErrors : true
    }

    render(){

        const formInputs = [];
        for( let key in this.state.controls ){
            const input = this.state.controls[key];
            formInputs.push(
                <div className={classes.input_container} >
                    <div className={classes.input} key={key} >
                        <TextField
                        type={input.type}
                        value={input.value}
                        error={false}
                        label={input.label}
                        />
                    </div><br></br>
                    { this.state.showErrors && input.error ? 
                        <Chip
                            icon={<ErrorIcon />}
                            label={input.error}
                            color="secondary"
                            variant="outlined"
                        />:
                    null }
                </div>
            )
        }

        const submitButton = <div className={classes.button} >
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.submitFormHandler}
                    >SignUp</Button>
                </div>

        return (
            <div className={classes.form} >
                <form>
                    {formInputs}
                    {submitButton}
                </form>
            </div>
        )
    }
}

export default Signup;